const isEmpty = require('lodash.isempty');
const { db } = require('../../services');
const generateKey = require('./generate-key');

module.exports = async function insertKey({
  key = generateKey(),
  author = {},
  target = {},
}) {
  const keyExists = !isEmpty(await db('keys').where('key', key));
  if (!keyExists) {
    await db('keys').insert({
      key,
      discord_id: target.id,
      generator_discord_id: author.id,
    });
    return key;
  } else {
    // Key already exists! Recursively try again.
    return insertKey({ key: generateKey(), author, target });
  }
};
