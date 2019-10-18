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
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var helpers_1 = require("../helpers");
var services_1 = require("../services");
var constants_1 = require("../utils/constants");
var ADMIN_ROLE_NAMES = [
    "Owner",
    "Project Manager",
    "Admin",
    /**
     *          { }
     *          {^^,
     *          (   `-;
     *     _     `;;~~
     *    /(______);
     *   (         (
     *    |:------( )
     *  _//         \\
     * / /          vv
     */
    "I'm a special snowflake",
];
var MODERATOR_ROLE_NAMES = [
    "Moderator",
    "---Developer---",
];
var texts = {
    NOT_ADMIN: function () { return "This command can only be used by ADMINISTRATOR ranks."; },
};
function syncPrivs(msg) {
    return __awaiter(this, void 0, void 0, function () {
        var member, guild, AMPModeratorRoleId, AMPAdminRoleId, moderatorRoles, moderatorMembers, adminRoles, adminMembers;
        var _a, _b;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (msg.channel instanceof discord_js_1.DMChannel || msg.channel instanceof discord_js_1.GroupDMChannel) {
                        return [2 /*return*/];
                    }
                    member = msg.member, guild = msg.channel.guild;
                    if (!!helpers_1.isAdmin(member)) return [3 /*break*/, 2];
                    return [4 /*yield*/, msg.channel.send(texts.NOT_ADMIN())];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
                case 2:
                    AMPModeratorRoleId = constants_1.ROLES.find(function (role) { return role.role_name === "moderator"; }).role_id;
                    AMPAdminRoleId = constants_1.ROLES.find(function (role) { return role.role_name === "admin"; }).role_id;
                    moderatorRoles = MODERATOR_ROLE_NAMES.map(function (rolename) { return guild.roles.find(function (role) { return role.name === rolename; }); });
                    moderatorMembers = (_a = []).concat.apply(_a, moderatorRoles.map(function (role) { return role.members.array(); }));
                    return [4 /*yield*/, Promise.all(moderatorMembers.map(function (moderatorMember) { return __awaiter(_this, void 0, void 0, function () {
                            var moderatorId;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        moderatorId = moderatorMember.user.id;
                                        return [4 /*yield*/, services_1.db("users")
                                                .where("discord_id", moderatorId)
                                                .update("role", AMPModeratorRoleId)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 3:
                    _c.sent();
                    adminRoles = ADMIN_ROLE_NAMES.map(function (rolename) { return guild.roles.find(function (role) { return role.name === rolename; }); });
                    adminMembers = (_b = []).concat.apply(_b, adminRoles.map(function (role) { return role.members.array(); }));
                    return [4 /*yield*/, Promise.all(adminMembers.map(function (adminMember) { return __awaiter(_this, void 0, void 0, function () {
                            var adminId;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        adminId = adminMember.user.id;
                                        return [4 /*yield*/, services_1.db("users")
                                                .where("discord_id", adminId)
                                                .update("role", AMPAdminRoleId)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 4:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = syncPrivs;
