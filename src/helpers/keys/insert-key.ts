import { GuildMember, User } from "discord.js";
import isEmpty from "lodash.isempty";
import { db } from "../../services";
import generateKey from "./generate-key";

export default async function insertKey({
  key = generateKey(),
  author,
  target,
}: {
  key?: string;
  author: User;
  target: GuildMember;
}): Promise<string> {
  const keyExists = !isEmpty(await db("keys").where("key", key));
  if (!keyExists) {
    await db("keys").insert({
      discord_id: target.id,
      generator_discord_id: author.id,
      key,
    });
    return key;
  } else {
    // Key already exists! Recursively try again.
    return insertKey({ key: generateKey(), author, target });
  }
}
