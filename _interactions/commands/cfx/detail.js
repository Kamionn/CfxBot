const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../../_storage/config')
const cfx_api = require("cfx-api");

module.exports = {
	name: 'detail',
	help: 'This command shows the resources of its FiveM or RedM server.',
	description: 'Show status fiveM, redM and Cfx.',
	usage: '`/detail`',

	permissions: [],
	ownerOnly: false,
	guildOnly: true,

	data: new SlashCommandBuilder()
               .setName('detail')
               .setDescription('choose wich status want see'),
               
	error: false,
	execute: async ({ interaction, client }) => {
			const cfx = await cfx_api.fetchServer(config.CFX.CfxID)
			let embed = new MessageEmbed()
			.addFields(
				{name: 'Gametype', value: `${cfx.gameType}`, inline: true},
				{name: 'mapName', value: `${cfx.mapName}`, inline: true},
				{name: 'Owner', value: `[${cfx.ownerName}](${cfx.ownerProfileUrl})`, inline: true},
				{name: 'Fallback', value: `[Connect](${cfx.connectedEndpoints})`, inline: true},
				{name: 'Player\'s', value: `${cfx.playersCountFromServerReport}`, inline: true},
				{name: 'UpVote', value: `${cfx.upvotePower}`, inline: true},
				{name: 'OneSync', value: `${cfx.isOneSyncEnabled}`, inline: true},
				{name: 'Server Full', value: `${cfx.isFull}`, inline: true},
				{name: 'Private', value: `${cfx.private}`, inline: true},
			)
			.setThumbnail(`${cfx.ownerAvatarUrl}`)
			.setColor(config.Discord.Color)
			.setFooter({ text: interaction.user.username})
			.setTimestamp()	
		await interaction.followUp({embeds: [embed]})
	
	}
};
