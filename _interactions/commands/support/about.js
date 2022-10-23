const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const config = require('../../../_storage/config')
const os = require("os");
const { outdent } = require("outdent");


module.exports = {
	name: 'about',
	help: 'This command allows to have information about the bot.',
	description: 'Shows lots of cool information about the bot!',
	usage: '`/about`',

	permissions: [],
	ownerOnly: false,
	guildOnly: true,

	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Shows lots of cool information about the bot!'),

	error: false,
	execute: async ({ interaction, client }) => {
		const guilds = client.guilds.cache.size;
		const channels = client.channels.cache.size;
		const users = client.guilds.cache.reduce((size, g) => size + g.memberCount, 0);
		const platform = process.platform.replace(/win32/g, "Windows");
		const cpuUsage = `${(process.cpuUsage().user / 1024 / 1024).toFixed(2)} MB`;
		const botUsage = `${((process.memoryUsage().heapUsed / os.totalmem()) * 100).toFixed(1)}%`;

		const embed = new MessageEmbed()
			.setTitle('My Information')
			.setDescription(`Hello ! I\'m Cfx.Bot`)
			.addFields({name : "My Stats", value: `\`\`\`Servers: ${guilds}\nUsers: ${users}\nChannels: ${channels}\`\`\``, inline: true })
			.addFields({name : "My Performances ", value:`\`\`\`Os: ${platform}\nCpu: ${cpuUsage}\nRam: ${botUsage}\`\`\``, inline: true })
			.addFields({name : "Others", value:`\`\`\`Node Js: ${process.versions.node}\nDiscord Js: 1.13.9\nDeveloper: Kamion#1323\`\`\``, inline: true })
			.setColor(config.Discord.Color)
			.setFooter({ text: interaction.user.username})
		.setTimestamp()
			const row = new MessageActionRow()
			.addComponents([
				new MessageButton()
					.setLabel('Invite Link')
					.setURL('https://discord.com/api/oauth2/authorize?client_id=1002978975859089469&permissions=8&scope=bot%20applications.commands')
					.setStyle('LINK'),
			])
			.addComponents([
				new MessageButton()
					.setLabel('Support Server')
					.setURL('https://discord.gg/' + config.Discord.Support_Link)
					.setStyle('LINK'),
			])
			.addComponents([
				new MessageButton()
					.setLabel('Github')
					.setURL('https://github.com/Kamionn')
					.setStyle('LINK'),
			]);
		interaction.followUp({ embeds: [embed],  components: [row]  });
	},
};