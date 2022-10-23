const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../../_storage/config')
const cfx_api = require("cfx-api");

module.exports = {
	name: 'status',
     help: 'This command allows you to see the status of a FiveM or RedM server but also to see the status of cfx.re.',
	description: 'Show status fiveM, redM and Cfx.',
	usage: '`/status [Server/Cfx]`',

	permissions: [],
	ownerOnly: false,
	guildOnly: true,

	data: new SlashCommandBuilder()
               .setName('status')
               .setDescription('choose wich status want see')

               .addStringOption(option => option
                    .setName('status').setRequired(true)
                    .setDescription('How long for?')
                    .addChoice('Server', 'server_status')
                    .addChoice('Cfx', 'cfx_status'),
               ),

	error: false,
	execute: async ({ interaction, client }) => {
          const status = interaction.options.getString('status');
                    if (status == "server_status") {
                         const cfx = await cfx_api.fetchServer(config.CFX.CfxID)
                              if (cfx !== undefined) {
                                   let embed = new MessageEmbed()
                                        .setColor(config.Discord.Color)
                                        .addFields(
                                             { name: 'Status server', value: `\`\`\`${await cfx_api.fetchServer(config.CFX.CfxID) ? "✅ Online" : "❌ Offline"}\n\`\`\``, inline: true },  
                                             { name: 'Member\'s count\'s', value: `\`\`\`\n${cfx.playersCount}/ ${cfx.maxPlayers} member's\n\`\`\``, inline: true }, 
                                        )
                                        .setFooter({ text: interaction.user.username})
		                              .setTimestamp()
                                        
                                        if (config.CFX.CfxPlayer === true) {
                                             const PlayerOnline = []
                                             for (var player in cfx.players)
                                             {
                                                  PlayerOnline.push(`${cfx.players[player].name} (${cfx.players[player].ping} ms)\n`)
                                             }
                                             for (let i = 0; i < PlayerOnline.length; i += 14)
                                             {
                                             embed.addFields({ name: '\u200B', value: `\`\`\`\n${PlayerOnline.sort().slice(i, i + 14).join('')}\n\`\`\``, inline: false },)
                                             }
                                        }
                                   await interaction.followUp({embeds: [embed]})
                              };
                         }

                    if (status == "cfx_status") {
                         const status = await cfx_api.fetchStatus();
                         const components = await status.fetchComponents();
                         let ComponentsActive = ""
                         if(Object.keys(components)) {for(let c of components) {ComponentsActive += `${c.name}: ${c.status}\n`}}
                         let embedcfx = new MessageEmbed()
                         .setTitle('Status Cfx.re')
                         .setDescription(`\`\`\`\n${status.everythingOk ? "All Cfx.re systems are operational" : "Cfx.re is experiencing issues"}\n\`\`\``)
                         .addFields(
                              { name: `\u200B`, value: `\`\`\`\n${ComponentsActive}\n\`\`\``, inline: true },
                         )
                         .setColor(config.Discord.Color)    
                         .setFooter({ text: interaction.user.username})
                         .setTimestamp()
                    await interaction.followUp({embeds: [embedcfx]})
               };
          },
     };
