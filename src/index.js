const bot = require('./services/discord');

bot.on('ready', () => {
  console.log('ready');
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});
