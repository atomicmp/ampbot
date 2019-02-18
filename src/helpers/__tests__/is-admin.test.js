/* eslint-jest */
const Discord = require('discord.js');
const { isAdmin } = require('..');

describe('isAdmin helper', () => {
  test('should return truthy if member does have ADMINISTRATOR', () => {
    const member = {
      permissions: new Discord.Permissions(null, 8),
    };

    expect(isAdmin(member)).toBeTruthy();
  });
  test('should return falsy if member does not have ADMINISTRATOR', () => {
    const member = {
      permissions: new Discord.Permissions(null, 0),
    };
    expect(isAdmin(member)).toBeFalsy();
  });
});
