import { Message } from "discord.js";

import uuid from "uuid/v1";
import { db } from "../services";

const { WEBSITE_URL } = process.env;

export default async function recoverPasswordCommand(msg: Message) {
  const userId = msg.author.id;

  const [user] = await db("users").where({ discord_id: userId });

  if (!user) {
    msg.channel.send("Forum account not found!");
    return;
  }

  const requestId = uuid();

  await db("users")
    .where({
      discord_id: userId,
    })
    .update({
      recovery_request: requestId,
    });

  await msg.member.send(
    `You can recover your password at ${WEBSITE_URL}/recovery?id=${requestId}`,
  );
}
