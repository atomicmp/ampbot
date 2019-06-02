"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("./database"));
exports.db = database_1.default;
var discord_1 = __importDefault(require("./discord"));
exports.bot = discord_1.default;
var logger_1 = __importDefault(require("./logger"));
exports.logger = logger_1.default;
