const bot = require('../services/discord')
const db = require('../services/database')

const generateKey = require('../helpers/generate-key') 

const insertKey = ({key, author, target}) => {
  db('keys')
    .where('key', key)
    .then(data => {
      if (data.length === 0) {
        db('keys').insert({
          key,
          discord_id: target.id,
          generator_discord_id: author.id,
        }).catch().then()
      } else {
        // Key already exists! Recursively try again.
        const newKey = generateKey()
        insertKey({ key: newKey, author, target })
      }
    })
}

module.exports = function acceptApplicationCommand(msg) {
  const {
    author
   } = msg
  const targets = msg.mentions.members.array()

  console.log(targets)
  targets.forEach(target => {
    const key = generateKey()
    insertKey({ key, author, target })
    target.send(key)

  })
  // targets.forEach(target => {

  // })
}