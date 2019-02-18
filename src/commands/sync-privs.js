const { db } = require('../services');
const { isAdmin } = require('../helpers');
const { ROLES } = require('../utils/constants');

const ADMIN_ROLE_NAMES = [
  'Owner',
  'Project Manager',
  'Admin'
]

const MODERATOR_ROLE_NAMES = [
  'Moderator'
]

const texts = {
  NOT_ADMIN: () => 'This command can only be used by ADMINISTRATOR ranks.',
};

module.exports = async function syncPrivs(msg) {
  const { member, channel: { guild } } = msg;
  if (!isAdmin(member)) {
    await msg.channel.send(texts.NOT_ADMIN());
    return;
  }

  const moderatorRoles = MODERATOR_ROLE_NAMES.map(rolename => guild.roles.find(role => role.name === rolename))
  
  const moderatorMembers = [].concat(
    ...moderatorRoles.map(role => role.members.array())
  )
  await Promise.all(
    moderatorMembers.map(async moderator => {
      const moderatorId = moderator.user.id;
      const moderatorRoleId = ROLES.find(role => role.role_name === 'moderator').role_id
      await db('users')
        .where('discord_id', moderatorId)
        .update('role', moderatorRoleId)
    })
  )

  const adminRoles = ADMIN_ROLE_NAMES.map(rolename => guild.roles.find(role => role.name === rolename))

  const adminMembers = [].concat(
    ...adminRoles.map(role => role.members.array())
  )

  await Promise.all(
    adminMembers.map(async admin => {
      const adminId = admin.user.id;
      const adminRoleId = ROLES.find(role => role.role_name === 'admin').role_id
      await db('users')
        .where('discord_id', adminId)
        .update('role', adminRoleId)
    })
  )
}