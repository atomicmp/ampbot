"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
services_1.bot.on("ready", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        services_1.logger.info("ready");
        services_1.db.raw('select 1+1 as result').catch(function (_) {
            services_1.logger.error("Cannot reach DB! Exiting...");
            process.exit();
        });
        return [2 /*return*/];
    });
}); });
services_1.bot.on("message", function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    var messageContent, command, _a, _b, _i, substr;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!msg.content.startsWith("" + COMMAND_PREFIX)) return [3 /*break*/, 2];
                messageContent = helpers_1.parseMessageContent(msg);
                command = commands_1.default[lodash_first_1.default(messageContent.split(" "))];
                if (!(typeof command === "function" && command !== undefined)) return [3 /*break*/, 2];
                return [4 /*yield*/, command(msg)];
            case 1:
                _c.sent();
                _c.label = 2;
            case 2:
                _a = [];
                for (_b in substrings_1.default)
                    _a.push(_b);
                _i = 0;
                _c.label = 3;
            case 3:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                substr = _a[_i];
                if (!(msg.content.toLowerCase().indexOf(substr) !== -1)) return [3 /*break*/, 5];
                return [4 /*yield*/, substrings_1.default[substr](msg)];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/];
        }
    });
}); });
services_1.bot.on("guildBanAdd", function (_, user) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, helpers_1.banUserAccount(user.id)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
services_1.bot.on("guildMemberRemove", function (member) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, helpers_1.banUserAccount(member.user.id)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
services_1.bot.on("error", function (err) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        services_1.logger.error(err);
        return [2 /*return*/];
    });
}); });
services_1.bot.on("reconnecting", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        services_1.logger.debug({ message: "Reconnecting to Discord API", timestamp: new Date() });
        return [2 /*return*/];
    });
}); });
process.on("exit", function () {
    services_1.bot.destroy();
    services_1.db.destroy();
});
