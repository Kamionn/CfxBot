const { SlashCommandBuilder, PermissionFlagsBits } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const config = require('../../../_storage/config')

module.exports = {
	name: 'cfx_setup',
	description: 'Shows lots of cool information about the bot!',
	usage: '`/cfx_setup`',

	permissions: [],
	ownerOnly: false,
	guildOnly: true,

	data: new SlashCommandBuilder()
			.setName('cfx_setup')
			.setDescription('Applies a timeout to a user')
			.addStringOption(option => option
                    .setName('language').setRequired(true)
                    .setDescription('Wich language')
				.addChoice('English', 'english_language')
                    .addChoice('Français', 'french_language')
				.addChoice('German', 'german_language')
				.addChoice('Spanish', 'spanish_language'),
               )
			.addStringOption(option => option
                    .setName('server').setRequired(true)
                    .setDescription('Wich type cfx launcher')
                    .addChoice('fivem', 'fivem_launcher')
                    .addChoice('redm', 'redm_launcher'),
               )
			.addStringOption(option => option.setName('server_id').setDescription('Enter you cfx id').setRequired(true))
			.addBooleanOption(option => option.setName('player_embed').setDescription('Select a boolean').setRequired(true)),
	error: false,
	execute: async ({ interaction, client, firestore }) => {
		const collection = await firestore.doc(`/guilds/${interaction.guild.id}`).get();
		const guildData = collection.data() || defaultData;

		const config = interaction.options.getString('cfx_setup');
			if (config == "english_language") {
			
			const embed = new MessageEmbed()
			.setTitle('Successfully set up!')
			interaction.followUp({ embeds: [embed] });
		}
		console.log(guildData)
		await firestore.doc(`/guilds/${interaction.guild.id}`).set(guildData);
	},
};