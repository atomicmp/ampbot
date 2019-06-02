import { GuildMember, Message, Role } from "discord.js";
import { isAdmin } from "../helpers";
import { db, logger } from "../services";

const texts = {
  NOT_ADMIN: () => "This command can only be used by ADMINISTRATOR ranks.",
};

export default async function cleanupTestersCommand(msg: Message) {
  const { member } = msg;
  if (!isAdmin(member)) {
    await msg.channel.send(texts.NOT_ADMIN());
    return;
  }

  const forumUsers = new Set(
    (await db("users").select("discord_id")).map((entry) => entry.discord_id),
  );

  const TestersRole: Role = msg.guild.roles.find((role) => role.name === "Testers");
  const targets = TestersRole.members.array();

  await Promise.all(
    targets.map(async (target: GuildMember) => {
      const targetId = target.user.id;
      if (!forumUsers.has(targetId)) {
        logger.info(target.user.username, "does not have a forum account");
        await db("keys")
          .where("discord_id", targetId)
          .del();
        await target.send(
          `You have been removed from Testers due to inactivity.
Your key has been invalidated. Please reapply through the normal channels.`,
        );
        await target.removeRole(TestersRole);
      }
    }),
  );
  msg.channel.send("Tester cleanup complete!");
}
