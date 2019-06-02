import { Message } from "discord.js";

export default async function indyParse(msg: Message) {
  const indyEmoji = msg.guild.emojis.find(
    (emoji) => emoji.name === "dindy",
  );
  msg.react(indyEmoji);
}
