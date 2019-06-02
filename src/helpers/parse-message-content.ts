import { Message } from "discord.js";

const { COMMAND_PREFIX } = process.env;

export default function parseMessageContent(msg: Message) {
  return msg.content
    .substring(("" + COMMAND_PREFIX).length, msg.content.length)
    .trim();
}
