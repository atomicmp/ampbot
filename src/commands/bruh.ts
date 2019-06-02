import { Message } from "discord.js";

// bruh
import path from "path";

export default async function dabCommand(msg: Message) {
  await msg.channel.send("", {
    files: [path.resolve(__dirname, "../../public/images/bruh.png")],
  });
}
