/*
 * CfxBot Bot for Discord
 * Copyright (C) 2022 Matthéo Le Fur (Kamion#1323)
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
*/


const time = new Date();
const colors = require('colors');
console.log('                                                                          '.bold.blue + '\n' + '    _/_/_/      _/_/    _/_/_/_/_/    _/_/_/  _/_/_/_/  _/      _/   '.bold.blue + '\n' + '   _/    _/  _/    _/      _/      _/        _/          _/  _/      '.bold.blue + '\n' + '  _/_/_/    _/    _/      _/      _/        _/_/_/        _/         '.bold.blue + '\n'+' _/    _/  _/    _/      _/      _/        _/          _/  _/        '.bold.blue + '\n' + '_/_/_/      _/_/        _/  _/    _/_/_/  _/        _/      _/       '.bold.blue + '\n' + '                                                                          '.bold.blue + '\n' + '                        Created by ! Kamion#1323                          '.bold.blue + '\n' + '                                                                          '.bold.blue);       

require('dotenv').config();
const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./bot.js', {
	totalShards: 'auto',
	token: process.env['BotToken'],
	respawn: true,
});

manager.on('shardCreate', (shard) => {
	//console.log(`Launched shard ${shard.id + 1}/${manager.totalShards}`);
});

manager.spawn({ amount: this.totalShards, delay: 500, timeout: -1 });