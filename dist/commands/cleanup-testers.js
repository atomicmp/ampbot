"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var helpers_1 = require("../helpers");
var services_1 = require("../services");
var texts = {
    NOT_ADMIN: function () { return "This command can only be used by ADMINISTRATOR ranks."; },
};
function cleanupTestersCommand(msg) {
    return __awaiter(this, void 0, void 0, function () {
        var member, forumUsers, _a, TestersRole, targets;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    member = msg.member;
                    if (!!helpers_1.isAdmin(member)) return [3 /*break*/, 2];
                    return [4 /*yield*/, msg.channel.send(texts.NOT_ADMIN())];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
                case 2:
                    _a = Set.bind;
                    return [4 /*yield*/, services_1.db("users").select("discord_id")];
                case 3:
                    forumUsers = new (_a.apply(Set, [void 0, (_b.sent()).map(function (entry) { return entry.discord_id; })]))();
                    TestersRole = msg.guild.roles.find(function (role) { return role.name === "Testers"; });
                    targets = TestersRole.members.array();
                    return [4 /*yield*/, Promise.all(targets.map(function (target) { return __awaiter(_this, void 0, void 0, function () {
                            var targetId;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        targetId = target.user.id;
                                        if (!!forumUsers.has(targetId)) return [3 /*break*/, 4];
                                        services_1.logger.info(target.user.username, "does not have a forum account");
                                        return [4 /*yield*/, services_1.db("keys")
                                                .where("discord_id", targetId)
                                                .del()];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, target.send("You have been removed from Testers due to inactivity.\nYour key has been invalidated. Please reapply through the normal channels.")];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, target.removeRole(TestersRole)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 4:
                    _b.sent();
                    msg.channel.send("Tester cleanup complete!");
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = cleanupTestersCommand;
