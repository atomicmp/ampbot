import Discord from "discord.js";
const { DISCORD_TOKEN } = process.env;

if (!DISCORD_TOKEN) throw Error("Token not found!");

const client = new Discord.Client();

client.login(DISCORD_TOKEN);

export default client;
