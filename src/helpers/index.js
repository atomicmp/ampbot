module.exports = {
  generateKey: require('./keys/generate-key'),
  insertKey: require('./keys/insert-key'),
  parseMessageContent: require('./parse-message-content'),
  isAdmin: require('./is-admin'),
  banUserAccount: require('./ban-user-account')
};
