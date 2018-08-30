// You owe me one PlayerDeer
const path = require('path')

module.exports = msg => {
  msg.channel.send('',{
    files: [
      path.resolve(__dirname, "../../public/images/dab.gif")
    ]
  })
}