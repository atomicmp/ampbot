"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_first_1 = __importDefault(require("lodash.first"));
var services_1 = require("./services");
var COMMAND_PREFIX = process.env.COMMAND_PREFIX;
var helpers_1 = require("./helpers");
var commands_1 = __importDefault(require("./commands"));
var substrings_1 = __importDefault(require("./substrings"));
services_1.bot.on("ready", function () {
    services_1.logger.info("ready");
});
services_1.bot.on("message", function (msg) {
    if (msg.content.startsWith("" + COMMAND_PREFIX)) {
        var messageContent = helpers_1.parseMessageContent(msg);
        var command = commands_1.default[lodash_first_1.default(messageContent.split(" "))];
        if (typeof command === "function" && command !== undefined) {
            command(msg)
                .catch(services_1.logger.error)
                .then();
        }
    }
    for (var substr in substrings_1.default) {
        if (msg.content.toLowerCase().indexOf(substr) !== -1) {
            substrings_1.default[substr](msg)
                .catch(services_1.logger.error)
                .then();
        }
    }
});
services_1.bot.on("guildBanAdd", function (_, user) {
    helpers_1.banUserAccount(user.id)
        .catch(services_1.logger.error)
        .then();
});
services_1.bot.on("guildMemberRemove", function (member) {
    helpers_1.banUserAccount(member.user.id)
        .catch(services_1.logger.error)
        .then();
});
services_1.bot.on("error", function (err) {
    services_1.logger.error(err);
});
