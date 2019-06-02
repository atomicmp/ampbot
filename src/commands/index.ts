import { Message } from "discord.js";
import acceptApplication from "./accept-application";
import bruh from "./bruh";
import cleanupTesters from "./cleanup-testers";
import dab from "./dab";
import factionInit from "./faction-init";
import factionSync from "./faction-sync";
import ping from "./ping";
import recoverPassword from "./recover-password";
import syncPrivs from "./sync-privs";
import unban from "./unban";

interface IDiscordCommand {
  [key: string]: (msg: Message) => Promise<any>;
}

const commandsKey: IDiscordCommand = {
  acceptApp: acceptApplication,
  acceptApplication,
  bruh,
  cleanupTesters,
  dab,
  factionInit,
  factionSync,
  ping,
  recoverPassword,
  resetPassword: recoverPassword,
  syncPrivs,
  unban,
};

export default commandsKey;
