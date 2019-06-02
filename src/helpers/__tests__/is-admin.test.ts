/* eslint-jest */
import Discord, { GuildMember } from "discord.js";
import { isAdmin } from "..";

describe("isAdmin helper", () => {
  test("should return truthy if member does have ADMINISTRATOR", () => {
    const permissions = new Discord.Permissions({} as GuildMember, 8);
    const member = {
      permissions,
    } as GuildMember;

    expect(isAdmin(member)).toBeTruthy();
  });
  test("should return falsy if member does not have ADMINISTRATOR", () => {
    const permissions = new Discord.Permissions({} as GuildMember, 0);
    const member = {
      permissions,
    } as GuildMember;
    expect(isAdmin(member)).toBeFalsy();
  });
});
