const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../../_storage/config')
const cfx_api = require("cfx-api");

module.exports = {
	name: 'resources',
	help: 'This command all the resources active of its FiveM or RedM server.',
	description: 'This command all the resources active of its FiveM or RedM server.',
	usage: '`/ressource`',

	permissions: ['Administrator'],
	ownerOnly: false,
	guildOnly: true,

	data: new SlashCommandBuilder()
               .setName('resources')
               .setDescription('see you resources active.'),
               
	error: false,
	execute: async ({ interaction, client }) => {
			const cfx = await cfx_api.fetchServer(config.CFX.CfxID)
			console.log(cfx.resources)
			let embed = new MessageEmbed()
			.setDescription(`\`\`\`${cfx.resources.join("    ")}\`\`\``)
			.setColor(config.Discord.Color)
			.setFooter({ text: interaction.user.username})
			.setTimestamp()	
		await interaction.followUp({embeds: [embed]})
	}
};
