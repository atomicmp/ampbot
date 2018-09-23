// You owe me one PlayerDeer
const path = require('path');

module.exports = async function dabCommand(msg) {
  await msg.channel.send('', {
    files: [path.resolve(__dirname, '../../public/images/dab.gif')],
  });
};
