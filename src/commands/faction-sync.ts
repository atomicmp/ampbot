import { Emoji, GuildMember, Message, Role } from "discord.js";
import { isAdmin } from "../helpers";
import { db } from "../services";

const texts = {
  NOT_ADMIN: () => "This command can only be used by ADMINISTRATOR ranks.",
};

async function updateFactionInformation(role: Role) {
  await db("factions")
    .where("role_id", role.id)
    .update({
      color: role.hexColor,
      faction_name: role.name,
    });
}

export default async function factionInitCommand(msg: Message) {
  const { member } = msg;

  if (!isAdmin(member)) {
    await msg.channel.send(texts.NOT_ADMIN());
    return;
  }
  const acknowledgeEmoji = msg.guild.emojis.find(
    (emoji: Emoji) => emoji.name === "puppetdab",
  );
  const factionsList = await db("factions");
  for (const faction of factionsList) {
    const factionRole = msg.guild.roles.find(
      (role: Role) => role.id === faction.role_id,
    );
    await updateFactionInformation(factionRole);
    await db("users")
      .where("faction", faction.faction_id)
      .update({ faction: null });

    const factionMembers = factionRole.members.array();
    await Promise.all(
      factionMembers.map((factionMember: GuildMember) =>
        db("users")
          .where("discord_id", factionMember.user.id)
          .update({ faction: faction.faction_id }),
      ),
    );
  }
  await msg.react(acknowledgeEmoji);
}
