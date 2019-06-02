import { Message } from "discord.js";

export default async function pingCommand(msg: Message) {
  await msg.reply("Pong!");
}
