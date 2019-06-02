import { User } from "discord.js";
import { db } from "../services";

export default async function removeMemberById(userId: User["id"]) {
  await db("users")
    .where("discord_id", userId)
    // Set user state to banned
    .update("role", 1);
}
