const first = require('lodash.first');
const bot = require('./services/discord');
const { COMMAND_PREFIX } = process.env;

const { parseMessageContent, banUserAccount } = require('./helpers');

const commands = require('./commands');
const substrings = require('./substrings');

bot.on('ready', () => {
  console.log('ready');
});

bot.on('message', msg => {
  if (msg.content.startsWith(COMMAND_PREFIX)) {
    const messageContent = parseMessageContent(msg);
    const command = commands[first(messageContent.split(' '))];
    if (typeof command === 'function') {
      command(msg)
        .catch(console.error)
        .then();
    }
  }
  for (const substr in substrings) {
    if (msg.content.toLowerCase().indexOf(substr) !== -1) {
      substrings[substr](msg)
        .catch(console.error)
        .then();
    }
  }
});

bot.on('guildBanAdd', (_, user) => {
  banUserAccount(user.id)
    .catch(console.error)
    .then();
});
bot.on('guildMemberRemove', member => {
  banUserAccount(member.user.id)
    .catch(console.error)
    .then();
});
