"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var COMMAND_PREFIX = process.env.COMMAND_PREFIX;
function parseMessageContent(msg) {
    return msg.content
        .substring(("" + COMMAND_PREFIX).length, msg.content.length)
        .trim();
}
exports.default = parseMessageContent;
