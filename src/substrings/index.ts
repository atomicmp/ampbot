import { Message } from "discord.js";
import indy from "./indy";

interface IMessageScrubber {
  [key: string]: (msg: Message) => Promise<any>;
}

const scrubberKey: IMessageScrubber = {
  indy,
};

export default scrubberKey;
