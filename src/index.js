const first = require('lodash.first')
const bot = require('./services/discord');
const {COMMAND_PREFIX} = process.env

const {
  parseMessageContent
} = require('./helpers')

const commands = require('./commands')

bot.on('ready', () => {
  console.log('ready');
});

bot.on('message', msg => {
  if (msg.content.startsWith(COMMAND_PREFIX)) {
    const messageContent = parseMessageContent(msg)
    const command = commands[first(messageContent.split(' '))]
    if (typeof command === 'function') {
      try {
        command(msg)
      } catch(err) {
        console.error(err)
      }
    }
  }
});
