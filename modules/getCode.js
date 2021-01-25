const Users = require('../models/User');
const Imperial = require('imperial-node').Imperial;

// Utilities
const throwError = require('../utils/throwError');

module.exports = msg => {
  Users.findOne({ userId: msg.author.id }, (err, user) => {
    if (err) return throwError(msg, 'An internal server error occured! Please contact an admin!');
    if (user) {
      const api = new Imperial(user.apiToken);
      const documentId = msg.content.substr(msg.content.indexOf(' ', msg.content.indexOf(' ') + 1)).replace(/\s/g, '');
      api.getCode(documentId)
        .then(paste => {
          if (paste.success) {
            msg.channel
              .send(`\`\`\`${paste.document}\`\`\``)
              .catch(() => throwError(msg, `Code is too long! Here is a URL, https://imperialb.in/p/${documentId}`));
          } else {
            throwError(msg, 'Sorry, but we couldn\'t find the paste you were looking for!')
          }
        }).catch(err => throwError(msg, 'There was an error getting your paste!'))
    } else {
      throwError(msg, 'Please hook up your IMPERIAL account by doing `!imp api` before trying to get code!')
    }
  })
}