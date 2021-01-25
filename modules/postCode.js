const Users = require('../models/User');
const Imperial = require('imperial-node').Imperial;

// Utilities
const throwError = require('../utils/throwError');
const options = {
  max: 1,
  time: 30000
}

module.exports = msg => {
  Users.findOne({ userId: msg.author.id }, (err, user) => {
    if (user) {
      msg.channel.send('Go ahead and paste what you want to save in the chat, or type \'CANCEL\' in all caps to cancel!')
      msg.channel.awaitMessages(awaitingMessage => awaitingMessage.author.id == msg.author.id, options)
        .then(authorsMessage => {
          const code = authorsMessage.first()
          if (code) {
            if (code.content !== 'CANCEL') {
              const api = new Imperial(user.apiToken)
              api.postCode(code.content)
                .then(paste => msg.reply(paste.formattedLink))
                .then(msg.delete());
            } else {
              throwError(msg, "The operation has been cancelled")
            }
          } else {
            throwError(msg, 'You didn\'t respond in 30 seconds! The operation has been cancelled')
          }
        }).catch(() => throwError(msg, 'An internal server error occured!'))
    } else {
      throwError(msg, 'Please hook up your IMPERIAL account by doing `!imp api` before trying to post code!')
    }
  })
}