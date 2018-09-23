const isEmpty = require('lodash.isempty');
const db = require('../services/database');

const texts = {
  NOT_ADMIN: () => 'This command can only be used by ADMINISTRATOR ranks.',
};

async function updateFactionInformation(role) {
  await db('factions')
    .where('role_id', role.id)
    .update({
      faction_name: role.name,
      color: role.hexColor,
    });
}

module.exports = async function factionInitCommand(msg) {
  const { member } = msg;

  if (!member.permissions.has('ADMINISTRATOR')) {
    await msg.channel.send(texts.NOT_ADMIN());
    return;
  }
  const acknowledgeEmoji = msg.guild.emojis.find(
    emoji => emoji.name === 'puppetdab'
  );
  const factionsList = await db('factions');
  for (const faction of factionsList) {
    const factionRole = msg.guild.roles.find(
      role => role.id == faction.role_id
    );
    await updateFactionInformation(factionRole);
    await db('users')
      .where('faction', faction.faction_id)
      .update({ faction: null });

    const factionMembers = factionRole.members.array();
    await Promise.all(
      factionMembers.map(member =>
        db('users')
          .where('discord_id', member.user.id)
          .update({ faction: faction.faction_id })
      )
    );
  }
  await msg.react(acknowledgeEmoji);
};
