import ping from './ping';
import acceptApplication from './accept-application';
import acceptApplication from './accept-application';
import dab from './dab';
import cleanupTesters from './cleanup-testers';
import bruh from './bruh';
import factionInit from './faction-init';
import factionSync from './faction-sync';
import recoverPassword from './recover-password';
import syncPrivs from './sync-privs';
import unban from './unban';

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
