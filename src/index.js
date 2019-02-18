const first = require('lodash.first');
const { bot, logger } = require('./services');
const { COMMAND_PREFIX } = process.env;

const { parseMessageContent, banUserAccount } = require('./helpers');

const commands = require('./commands');
const substrings = require('./substrings');

bot.on('ready', () => {
  logger.info('ready');
});

bot.on('message', msg => {
  if (msg.content.startsWith(COMMAND_PREFIX)) {
    const messageContent = parseMessageContent(msg);
    const command = commands[first(messageContent.split(' '))];
    if (typeof command === 'function') {
      command(msg)
        .catch(logger.error)
        .then();
    }
  }
  for (const substr in substrings) {
    if (msg.content.toLowerCase().indexOf(substr) !== -1) {
      substrings[substr](msg)
        .catch(logger.error)
        .then();
    }
  }
});

bot.on('guildBanAdd', (_, user) => {
  banUserAccount(user.id)
    .catch(logger.error)
    .then();
});
bot.on('guildMemberRemove', member => {
  banUserAccount(member.user.id)
    .catch(logger.error)
    .then();
});
