const ping = require('./ping');
const acceptApplication = require('./accept-application');
const dab = require('./dab');
const cleanupTesters = require('./cleanup-testers');
const bruh = require('./bruh');
const factionInit = require('./faction-init');
const factionSync = require('./faction-sync');
const recoverPassword = require('./recover-password');
const syncPrivs = require('./sync-privs');
const unban = require('./unban');

module.exports = {
  ping,
  acceptApplication,
  acceptApp: acceptApplication,
  dab,
  cleanupTesters,
  bruh,
  factionInit,
  factionSync,
  recoverPassword,
  resetPassword: recoverPassword,
  syncPrivs,
  unban,
};
