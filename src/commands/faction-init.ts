import isEmpty from "lodash.isempty";
import { db, logger } from "../services";

import { Emoji, GuildMember, Message } from "discord.js";
import { isAdmin } from "../helpers";

const texts = {
  NOT_ADMIN: () => "This command can only be used by ADMINISTRATOR ranks.",
};
export default async function factionInitCommand(msg: Message) {
  const { member } = msg;
  const acknowledgeEmoji = msg.guild.emojis.find(
    (emoji: Emoji) => emoji.name === "puppetdab",
  );

  if (!isAdmin(member)) {
    await msg.channel.send(texts.NOT_ADMIN());
    return;
  }
  const [targetRole] = msg.mentions.roles.array();
  if (!targetRole) {
    await msg.channel.send("This command requires a target role.");
    return;
  }
  const factionExists = !isEmpty(
    await db("factions").where("role_id", targetRole.id),
  );

  if (factionExists) {
    await msg.channel.send(`${targetRole.name} faction already initialized!`);
    return;
  }
  const [factionId] = await db("factions")
    .insert({
      color: targetRole.hexColor,
      faction_name: targetRole.name,
      role_id: targetRole.id,
    })
    .returning("faction_id");
  logger.info(factionId);
  const factionMembers = targetRole.members.array();

  await Promise.all(
    factionMembers.map((factionMember: GuildMember) =>
      db("users")
        .where("discord_id", factionMember.user.id)
        .update("faction", factionId),
    ),
  );
  await msg.react(acknowledgeEmoji);
}
