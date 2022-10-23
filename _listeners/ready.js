const { Collection } = require('discord.js');
const config = require('../_storage/config.json')
const moment = require('moment');
const colors = require('colors');
const fs = require('fs');

module.exports = {
	name: 'ready',
	once: true,

	execute: async (client) => {
		const timestamp = (`[${moment().format('DD-MM-YYYY kk:mm:ss')}]:`);
		console.log(`${timestamp}`.bold.cyan + ` [BOT]`.bold.blue + ` Connect at : `.bold.blue + `${client.user.tag}`.bold.white + ` (${client.user.id})`.bold.white);

		/* It's a custom function that I made to change the bot's status every 20 seconds. */
		const statuses = [
			`/help`,
			`${client.guilds.cache.size.toLocaleString()} servers`,
			`${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b).toLocaleString()} users`,
		 ];
   
		 let i = 0;
		 setInterval(async () => {
			await client.user.setPresence({activities: [{ name: statuses[i], type: `${config.Presence.type}`, url: `${config.Presence.url}` }],status: `${config.Presence.status}`,})
			i = ++i % statuses.length;
		 }, 20000);
		
		/* It's a custom function that I made to store the commands in a database. */
		client.commands = new Collection();
		const data = [];
		const categories = fs.readdirSync(`${__dirname}/../_interactions/commands/`);
		for (const category of categories) {
			const commandFiles = fs.readdirSync(`${__dirname}/../_interactions/commands/${category}`).filter(file => file.endsWith('.js'));
			for (const file of commandFiles) {
				const command = require(`${__dirname}/../_interactions/commands/${category}/${file}`);
				client.commands.set(command.name, command);
				data.push(command.data.toJSON());
			}
		}
		/* It's a custom function that I made to store the commands in a database. */
		await client.application.commands.set(data);
	},
};
