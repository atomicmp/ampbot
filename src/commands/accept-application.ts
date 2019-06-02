import isEmpty from "lodash.isempty";
import { db } from "../services";

import { GuildMember, Message } from "discord.js";
import { insertKey, isAdmin } from "../helpers";

const { WEBSITE_URL } = process.env;

const texts = {
  HAS_KEY: (target: GuildMember) => `${target.displayName} already has a key!`,
  KEY_MESSAGE: (key: string) =>
  `Here's your key! \`${key}\`\n\nYou can redeem it at ${WEBSITE_URL}/register.\n\n_See you in the Wasteland!_`,
  NOT_ADMIN: () => "This command can only be used by ADMINISTRATOR ranks.",
  NO_TARGETS: () => "This command requires targets. Please mention a user.",
};

export default async function acceptApplicationCommand(msg: Message) {
  const { author, member } = msg;
  if (!isAdmin(member)) {
    await msg.channel.send(texts.NOT_ADMIN());
    return;
  }
  const acknowledgeEmoji = msg.guild.emojis.find(
    (emoji) => emoji.name === "puppetdab",
  );
  const TestersRole = msg.guild.roles.find((role) => role.name === "Testers");
  const targets = msg.mentions.members.array();

  if (isEmpty(targets)) {
    await msg.channel.send(texts.NO_TARGETS());
  }
  await Promise.all(
    targets.map(async (target: GuildMember) => {
      const targetHasKey = !isEmpty(
        await db("keys").where("discord_id", target.id),
      );
      if (targetHasKey) {
        await msg.channel.send(texts.HAS_KEY(target));
      } else {
        const key = await insertKey({ author, target });
        await target.addRole(TestersRole);
        await target.send(texts.KEY_MESSAGE(key));
      }
    }),
  );
  await msg.react(acknowledgeEmoji);
}
