// You owe me one PlayerDeer
import { Message } from "discord.js";
import path from "path";
// import dabgif from "../../public/images/dab.gif";  

export default async function dabCommand(msg: Message) {
  await msg.channel.send("", {
    files: [path.resolve(__dirname, "../../public/images/dab.gif")],
  });
}
