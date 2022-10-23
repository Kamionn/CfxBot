const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { readdirSync } = require('fs');
const config = require('../../../_storage/config')

module.exports = {
	name: 'help',
	help: 'This command displays the list of commands.',
	description: 'Provides a list of all my commands!',
	usage: '`/help [command]`',

	permissions: [],
	ownerOnly: false,
	guildOnly: false,

	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Provides a list of all my commands!')
		.addStringOption(option => option
			.setName('command')
			.setDescription('Shows details about how to use a command')
			.setRequired(false),
		),

	error: false,
	execute: async ({ interaction, client }) => {

		let selectMenu = new MessageSelectMenu()
            .setCustomId('help')
            .setPlaceholder('Nothing selected')
            .setMinValues(1)
            .setMaxValues(1)
			.addOptions([
                {
                    label: 'Cfx',
                    description: 'Cfx command',
                    value: 'first_option',
                    emoji: '<:cfx:1000337963055591514>',
                },{
                    label: 'Support',
                    description: 'Support command',
                    value: 'second_option',
                    emoji: '<:moderator:1000337977358172190>',
                }, 
            ])
	   const row = new MessageActionRow().addComponents(selectMenu)
        const embed = new MessageEmbed()
		.setTitle(`${client.user.username}'s Help Page`)
		.setThumbnail(client.user.displayAvatarURL())
		.setDescription('The bot uses slash command, you can get information on a command by using \n `/help command`.')
		.addFields(
			{ name: 'Some useful links:', value: `\n> [Website Cfx.Bot](https://cfx.bot)\n> [Invite Cfx.Bot](https://discord.com/api/oauth2/authorize?client_id=1002978975859089469&permissions=8&scope=bot%20applications.commands)\n> [Vote for Cfx.Bot](https://top.gg)\n > [Github Developer](https://github.com/Kamionn)`, inline: false }, 
		)
		.setColor(config.Discord.Color)
		.setFooter({ text: interaction.user.username})
		.setTimestamp()
     	interaction.followUp({ embeds: [embed], components: [row], })

		const cmdName = interaction.options.getString('command');
		const cmd = client.commands.get(cmdName);

		if (cmd) {
			const embed = new MessageEmbed()
				.setTitle(`Command ` + cmd.name.charAt(0).toUpperCase() + cmd.name.slice(1))
				.setThumbnail(client.user.displayAvatarURL())
				.setDescription(cmd.help)
				.addFields({name : "Format", value: (cmd.usage ? ' ' + cmd.usage : ''), inline: true })
				.setColor(config.Discord.Color)
				.setFooter({ text: interaction.user.username})
				.setTimestamp()

			if (cmd.permissions[0] && cmd.ownerOnly == false) {
				embed.addField('Permissions:', '`' + cmd.permissions.join('` `') + '`', false);
			}
			if (!cmd.permissions[0] && cmd.ownerOnly == true) {
				embed.addField('Permissions:', `Server Owner Only`, false);
			}
			if (cmd.error == true) {
				embed.addField('Error:', 'This command is currently unavailable, please try again later.', false);
			}

			interaction.followUp({ embeds: [embed], ephemeral: false });
		}
	},
};
