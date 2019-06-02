import { GuildMember } from "discord.js";

export default (member: GuildMember) => member.permissions.has("ADMINISTRATOR");
