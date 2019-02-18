const isEmpty = require('lodash.isempty');
const { db } = require('../services');

const { isAdmin } = require('../helpers');

const texts = {
  NO_TARGETS: () => 'This command requires targets. Please mention a user.',
  NOT_ADMIN: () => 'This command can only be used by ADMINISTRATOR ranks.',
  NO_ACCOUNT: target => `No account found for ${target.displayName}!`,
  UNBANNED: target => `${target.displayName} has been unbanned!`
};

module.exports = async function unbanUser(msg) {
  const { author, member } = msg;
  if (!isAdmin(member)) {
    await msg.channel.send(texts.NOT_ADMIN());
    return;
  }

  const targets = msg.mentions.members.array();

  if (isEmpty(targets)) {
    await msg.channel.send(texts.NO_TARGETS());
  }
  await Promise.all(
    targets.map(async target => {
      const targetHasAccount = !isEmpty(
        await db('users').where('discord_id', target.id)
      );
      if (targetHasAccount) {
        await db('users').where('discord_id', target.id).update('role', 3);
        await msg.channel.send(texts.UNBANNED(target));
      } else {
        await msg.channel.send(texts.NO_ACCOUNT(target));
      }
    })
  );
};
