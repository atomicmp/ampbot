"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-jest */
var discord_js_1 = __importDefault(require("discord.js"));
var __1 = require("..");
describe("isAdmin helper", function () {
    test("should return truthy if member does have ADMINISTRATOR", function () {
        var permissions = new discord_js_1.default.Permissions({}, 8);
        var member = {
            permissions: permissions,
        };
        expect(__1.isAdmin(member)).toBeTruthy();
    });
    test("should return falsy if member does not have ADMINISTRATOR", function () {
        var permissions = new discord_js_1.default.Permissions({}, 0);
        var member = {
            permissions: permissions,
        };
        expect(__1.isAdmin(member)).toBeFalsy();
    });
});
