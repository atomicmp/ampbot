const { COMMAND_PREFIX } = process.env;

module.exports = function parseMessageContent(msg) {
  return msg.content.substring(COMMAND_PREFIX.length, msg.content.length);
};
