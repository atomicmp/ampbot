module.exports = async function indyParse(msg) {
  const indyEmoji = msg.guild.emojis.find(
    emoji => emoji.name === 'dindy'
  );
  msg.react(indyEmoji)
}