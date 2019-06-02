import isEmpty from "lodash.isempty";
import { db } from "../services";

import { GuildMember, Message } from "discord.js";
import { isAdmin } from "../helpers";

const texts = {
  NOT_ADMIN: () => "This command can only be used by ADMINISTRATOR ranks.",
  NO_ACCOUNT: (target: GuildMember) => `No account found for ${target.displayName}!`,
  NO_TARGETS: () => "This command requires targets. Please mention a user.",
  UNBANNED: (target: GuildMember) => `${target.displayName} has been unbanned!`,
};

export default async function unbanUser(msg: Message) {
  const { author, member } = msg;
  if (!isAdmin(member)) {
    await msg.channel.send(texts.NOT_ADMIN());
    return;
  }

  const targets = msg.mentions.members.array();

  if (isEmpty(targets)) {
    await msg.channel.send(texts.NO_TARGETS());
  }
  await Promise.all(
    targets.map(async (target: GuildMember) => {
      const targetHasAccount = !isEmpty(
        await db("users").where("discord_id", target.id),
      );
      if (targetHasAccount) {
        await db("users").where("discord_id", target.id).update("role", 3);
        await msg.channel.send(texts.UNBANNED(target));
      } else {
        await msg.channel.send(texts.NO_ACCOUNT(target));
      }
    }),
  );
}
