const Users = require('../models/User');
const Imperial = require('imperial-node').Imperial;

// Utilities
const throwError = require("../utils/throwError");

module.exports = msg => {
  Users.findOne({ userId: msg.author.id }, (err, user) => {
    if (err) return throwError(msg, 'An internal server error occured! Please contact an admin!');
    if (user) {
      const limit = msg.content.split(' ')[2];
      if (limit) {
        msg.channel.messages.fetch({ limit })
          .then(messages => {
            const api = new Imperial(user.apiToken);
            const msgArray = messages.array();
            const totalMsgArray = [];
            for (let i = 0; i < msgArray.length; i++) {
              if (!msgArray[i].author.bot) {
                const message = msgArray[i].content;
                const date = new Date(msgArray[i].createdTimestamp);
                const time = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.toTimeString().slice(9)}`;
                const user = `${msgArray[i].author.username}#${msgArray[i].author.discriminator}`;
                totalMsgArray.push(`${user} (${time})\n${message}\n`);
              }
            }
            api.postCode(totalMsgArray.toString().replace(/,/g, ""))
              .then(paste => msg.reply(paste.formattedLink))
              .then(msg.delete())
              .catch(() => throwError(msg, 'An error occured whilst posting the messages! Please contact an admin!'));
          }).catch(() => throwError(msg, 'An error occured whilst fetching the messages! Make sure you aren\'t trying to get more than 100 messages!'))
      } else {
        throwError(msg, 'You need to set an amount of messages you want to save!');
      }
    } else {
      throwError(msg, 'Please link your IMPERIAL account by doing `!imp api` before trying to save messages!')
    }
  })
}