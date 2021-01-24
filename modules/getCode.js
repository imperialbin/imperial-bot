const Users = require('../models/User');
const Imperial = require('imperial-node').Imperial;

// Utilities
const throwError = require('../utils/throwError');

const api = new Imperial()

module.exports = msg => {
  Users.findOne({ userId: msg.author.id }, (err, user) => {
    if (user) {
      var documentId = msg.content.substr(msg.content.indexOf(' ', msg.content.indexOf(' ') + 1)).replace(/\s/g, '');
      api.getCode(documentId).then(paste => {
        if (paste.success) {
          msg.channel
            .send(`\`\`\` ${paste.document} \`\`\``)
            .catch(() => throwError(msg, `Code is too long! Here is a URL, https://imperialb.in/p/${documentId}`));
        } else {
          throwError(msg, 'Sorry, but we couldn\'t find the paste you were looking for!')
        }
      })
    } else {
      throwError(msg, 'Please hook up your IMPERIAL account by doing `!imp api` before trying to get code!')
    }
  })
}