"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importDefault(require("discord.js"));
var DISCORD_TOKEN = process.env.DISCORD_TOKEN;
var client = new discord_js_1.default.Client();
client.login(DISCORD_TOKEN);
exports.default = client;
