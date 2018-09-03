const db = require('../services/database');
const discord = require('../services/discord');

module.exports = async function cleanupTestersCommand(msg) {
  const { member } = msg;
  if (!member.permissions.has('ADMINISTRATOR')) {
    await msg.channel.send(texts.NOT_ADMIN());
    return;
  }
  
  const forumUsers = new Set((await db('users').select('discord_id')).map(entry => entry.discord_id));

  const TestersRole = msg.guild.roles.find(role => role.name === 'Testers')
  const targets = TestersRole.members.array()

  await Promise.all(
    targets.map(async target => {
      const targetId = target.user.id;
      if (!forumUsers.has(targetId)) {
        console.log(target.user.username, "does not have a forum account")
        await db('keys').where('discord_id', targetId).del()
        await target.send('You have been removed from Testers due to inactivity. Your key has been invalidated. Please reapply through the normal channels.')
        await target.removeRole(TestersRole)
      } else {

      }
    })
  );
  msg.channel.send('Tester cleanup complete!')
};
