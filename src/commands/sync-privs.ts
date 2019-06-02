import { DMChannel, GroupDMChannel, GuildMember, Message, Role } from "discord.js";

import { isAdmin } from "../helpers";
import { db } from "../services";
import { ROLES } from "../utils/constants";

const ADMIN_ROLE_NAMES = [
  "Owner",
  "Project Manager",
  "Admin",
  /**
   *          { }
   *          {^^,
   *          (   `-;
   *     _     `;;~~
   *    /(______);
   *   (         (
   *    |:------( )
   *  _//         \\
   * / /          vv
   */
  "I'm a special snowflake",
];

const MODERATOR_ROLE_NAMES = [
  "Moderator",
  "---Developer---",
];

const texts = {
  NOT_ADMIN: () => "This command can only be used by ADMINISTRATOR ranks.",
};

export default async function syncPrivs(msg: Message) {
  if (msg.channel instanceof DMChannel || msg.channel instanceof GroupDMChannel) {
    return;
  }
  const { member, channel: { guild } } = msg;
  if (!isAdmin(member)) {
    await msg.channel.send(texts.NOT_ADMIN());
    return;
  }

  const AMPModeratorRoleId = (ROLES.find((role) => role.role_name === "moderator") as { role_id: number }).role_id;
  const AMPAdminRoleId = (ROLES.find((role) => role.role_name === "admin") as { role_id: number }).role_id;
  const moderatorRoles = MODERATOR_ROLE_NAMES.map((rolename) => guild.roles.find((role) => role.name === rolename));

  const moderatorMembers: GuildMember[] = ([] as GuildMember[]).concat(
    ...moderatorRoles.map((role: Role) => role.members.array()),
  );
  await Promise.all(
    moderatorMembers.map(async (moderatorMember: GuildMember) => {
      const moderatorId = moderatorMember.user.id;
      await db("users")
        .where("discord_id", moderatorId)
        .update("role", AMPModeratorRoleId);
    }),
  );

  const adminRoles = ADMIN_ROLE_NAMES.map((rolename) => guild.roles.find((role) => role.name === rolename));

  const adminMembers: GuildMember[] = ([] as GuildMember[]).concat(
    ...adminRoles.map((role: Role) => role.members.array()),
  );

  await Promise.all(
    adminMembers.map(async (adminMember: GuildMember) => {
      const adminId = adminMember.user.id;
      await db("users")
        .where("discord_id", adminId)
        .update("role", AMPAdminRoleId);
    }),
  );
}
