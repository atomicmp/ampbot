const bot = require('../services/discord');
const db = require('../services/database');

const {generateKey} = require('../helpers');

const insertKey = async ({ key, author, target }) => {
  db('keys')
    .where('key', key)
    .then(data => {
      if (data.length === 0) {
        db('keys')
          .insert({
            key,
            discord_id: target.id,
            generator_discord_id: author.id,
          })
          .catch()
          .then();
      } else {
        // Key already exists! Recursively try again.
        const newKey = generateKey();
        insertKey({ key: newKey, author, target });
      }
    });
};

module.exports = async function acceptApplicationCommand(msg) {
  const { author } = msg;
  if (!author.hasPermission('ADMINISTRATOR')) {
    await msg.channel.send(
      'This command can only be used by ADMINISTRATOR ranks.'
    );
    return;
  }
  const targets = msg.mentions.members.array();

  await Promise.all(
    targets.map(async target => {
      const key = generateKey();
      await insertKey({ key, author, target });
      await target.send(key);
    })
  );
};
