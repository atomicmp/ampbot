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

bot.on("message", async (msg: Message) => {
  if (msg.content.startsWith("" + COMMAND_PREFIX)) {
    const messageContent = parseMessageContent(msg);
    const command: (msg: Message) => Promise<void> = commands[
      first(messageContent.split(" ")) as string
    ];
    if (typeof command === "function" && command !== undefined) {
      await command(msg);
    }
  }
  for (const substr in substrings) {
    if (msg.content.toLowerCase().indexOf(substr) !== -1) {
      await substrings[substr as string](msg);
    }
  }
});

bot.on("guildBanAdd", async (_, user: User) => {
  await banUserAccount(user.id);
});

bot.on("guildMemberRemove", async (member: GuildMember) => {
  await banUserAccount(member.user.id);
});

bot.on("error", async (err) => {
  logger.error(err);
});

bot.on("reconnecting", async () => {
  logger.debug({message: "Reconnecting to Discord API", timestamp: new Date()})
})

process.on("exit", () => {
  bot.destroy();
})
