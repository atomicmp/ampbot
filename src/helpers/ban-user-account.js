const db = require('../services/database')

module.exports = async function removeMemberById(userId) {
  await db('users')
    .where('discord_id', userId)
    // Set user state to banned
    .update('role', 1)
}