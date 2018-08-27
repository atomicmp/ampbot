const Discord = require('discord.js');
const { DISCORD_TOKEN } = process.env;
const client = new Discord.Client();
client.login(DISCORD_TOKEN);
module.exports = client;
