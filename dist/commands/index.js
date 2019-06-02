"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var accept_application_1 = __importDefault(require("./accept-application"));
var bruh_1 = __importDefault(require("./bruh"));
var cleanup_testers_1 = __importDefault(require("./cleanup-testers"));
var dab_1 = __importDefault(require("./dab"));
var faction_init_1 = __importDefault(require("./faction-init"));
var faction_sync_1 = __importDefault(require("./faction-sync"));
var ping_1 = __importDefault(require("./ping"));
var recover_password_1 = __importDefault(require("./recover-password"));
var sync_privs_1 = __importDefault(require("./sync-privs"));
var unban_1 = __importDefault(require("./unban"));
var commandsKey = {
    acceptApp: accept_application_1.default,
    acceptApplication: accept_application_1.default,
    bruh: bruh_1.default,
    cleanupTesters: cleanup_testers_1.default,
    dab: dab_1.default,
    factionInit: faction_init_1.default,
    factionSync: faction_sync_1.default,
    ping: ping_1.default,
    recoverPassword: recover_password_1.default,
    resetPassword: recover_password_1.default,
    syncPrivs: sync_privs_1.default,
    unban: unban_1.default,
};
exports.default = commandsKey;
