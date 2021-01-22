const Users = require('../models/User');
const Imperial = require('imperial-node').Imperial;

// Utilities
const throwError = require('../utils/throwError');

module.exports = msg => {
  Users.findOne({ userId: msg.author.id }, (err, user) => {
    if (user) {
      msg.channel.send('Go ahead and paste what you want to save in the chat, or type \'CANCEL\' in all caps to cancel!')
      msg.channel.awaitMessages(awaitingMessage => awaitingMessage.author.id == msg.author.id, {
        max: 1,
        time: 30000
      }).then(authorsMessage => {
        if (authorsMessage.first()) {
          const api = new Imperial(user.apiToken)
          api.postCode(authorsMessage.first().content).then(paste => msg.reply(paste.formattedLink));
        } else {
          throwError(msg, 'You didn\'t respond in 30 seconds! The operation has been cancelled')
        }
      }).catch(err => {
        throwError(msg, 'An internal server error occured!')
      })
    } else {
      throwError(msg, 'Please hook up your IMPERIAL account by doing `!imp api` before trying to post code!')
    }
  })
}