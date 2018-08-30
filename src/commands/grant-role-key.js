const isEmpty = require('lodash.isempty');
const first = require('lodash.first');
const { WEBSITE_URL } = require('../utils/constants');
const db = require('../services/database');

const { insertKey } = require('../helpers');

const texts = {
  NO_TARGETS: () => 'This command requires targets. Please mention a role.',
  NOT_ADMIN: () => 'This command can only be used by ADMINISTRATOR ranks.',
  HAS_KEY: target => `${target.displayName} already has a key!`,
  KEY_MESSAGE: key =>
    `Here's your key! \`${key}\`\n\nYou can redeem it at ${WEBSITE_URL}/register.\n\n_See you in the Wasteland!_`,
};

module.exports = async function acceptApplicationCommand(msg) {
  const { author, member } = msg;
  if (!member.permissions.has('ADMINISTRATOR')) {
    await msg.channel.send(texts.NOT_ADMIN());
    return;
  }

  const targetRole = first(msg.mentions.roles.array());
  const targets = targetRole.members.array();

  if (isEmpty(targets)) {
    await msg.channel.send(texts.NO_TARGETS());
    return;
  }
  await Promise.all(
    targets.map(async target => {
      const targetHasKey = !isEmpty(
        await db('keys').where('discord_id', target.id)
      );
      if (targetHasKey) {
        // await msg.channel.send(texts.HAS_KEY(target));
      } else {
        const key = await insertKey({ author, target });

        await target.send(texts.KEY_MESSAGE(key));
      }
    })
  );
  msg.channel.send(`${targetRole.name} complete!`);
};
