import Discord from "discord.js";
const { DISCORD_TOKEN } = process.env;
const client = new Discord.Client();
client.login(DISCORD_TOKEN);

export default client;
