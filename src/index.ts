import first from "lodash.first";
import { bot, logger } from "./services";
const { COMMAND_PREFIX } = process.env;

import { banUserAccount, parseMessageContent } from "./helpers";

import { GuildMember, Message, User } from "discord.js";
import commands from "./commands";
import substrings from "./substrings";

bot.on("ready", () => {
  logger.info("ready");
});

bot.on("message", (msg: Message) => {
  if (msg.content.startsWith("" + COMMAND_PREFIX)) {
    const messageContent = parseMessageContent(msg);
    const command: (msg: Message) => Promise<void> = commands[
      first(messageContent.split(" ")) as string
    ];
    if (typeof command === "function" && command !== undefined) {
      command(msg)
        .catch(logger.error)
        .then();
    }
  }
  for (const substr in substrings) {
    if (msg.content.toLowerCase().indexOf(substr) !== -1) {
      substrings[substr as string](msg)
        .catch(logger.error)
        .then();
    }
  }
});

bot.on("guildBanAdd", (_, user: User) => {
  banUserAccount(user.id)
    .catch(logger.error)
    .then();
});
bot.on("guildMemberRemove", (member: GuildMember) => {
  banUserAccount(member.user.id)
    .catch(logger.error)
    .then();
});
bot.on("error", (err) => {
  logger.error(err);
});
