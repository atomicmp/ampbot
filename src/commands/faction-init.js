const isEmpty = require('lodash.isempty');
const db = require('../services/database');

const texts = {
  NOT_ADMIN: () => 'This command can only be used by ADMINISTRATOR ranks.',
};
module.exports = async function factionInitCommand(msg) {
  const { member } = msg;
  const acknowledgeEmoji = msg.guild.emojis.find(
    emoji => emoji.name === 'puppetdab'
  );

  if (!member.permissions.has('ADMINISTRATOR')) {
    await msg.channel.send(texts.NOT_ADMIN());
    return;
  }
  const [targetRole] = msg.mentions.roles.array();
  if (!targetRole) {
    await msg.channel.send('This command requires a target role.');
    return;
  }
  const factionExists = !isEmpty(
    await db('factions').where('role_id', targetRole.id)
  );

  if (factionExists) {
    await msg.channel.send(`${targetRole.name} faction already initialized!`);
    return;
  }
  const [factionId] = await db('factions')
    .insert({
      faction_name: targetRole.name,
      color: targetRole.hexColor,
      role_id: targetRole.id,
    })
    .returning('faction_id');
  console.log(factionId);
  const factionMembers = targetRole.members.array();

  await Promise.all(
    factionMembers.map(member =>
      db('users')
        .where('discord_id', member.user.id)
        .update('faction', factionId)
    )
  );
  await msg.react(acknowledgeEmoji);
};
