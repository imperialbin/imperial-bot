const Users = require('../models/User');
const fetch = require('node-fetch')

// Utilities
const throwError = require('../utils/throwError');
const throwSuccess = require('../utils/throwSuccess');

module.exports = async msg => {
  if (msg.channel.type == 'dm') {
    if (msg.content.includes('change')) {
      if (msg.content.split(' ').length == 2) {
        const req = await fetch(`https://imperialb.in/api/checkApiToken/${msg.content.split(' ')[1]}`);
        const verifyToken = await req.json();
        if (verifyToken.success) {
          Users.findOneAndUpdate({ userId: msg.author.id }, { $set: { apiToken: msg.content.split(' ')[1] } }, (err, user) => {
            if (err) return throwError(msg, 'A server error occurred whilst trying to change your API key!')
            if (user) {
              return throwSuccess(msg, 'Successfully linked your API token to your Discord account!');
            } else {
              return throwError(msg, 'You have not linked you\'re account yet! Please just pass your API key!')
            }
          })
        } else {
          return throwError(msg, 'That API token isn\'t valid!')
        }
      } else {
        return throwError(msg, 'You must pass your API key as well! Do change IMPERIAL-xxxx-xxxx-xxx')
      }
    } else if (msg.content.includes('IMPERIAL-')) {
      Users.findOne({ userId: msg.author.id }, async (err, user) => {
        if (user) {
          throwError(msg, 'You already have an API token hooked up to your discord account! Do you want to relink? Type \'change IMPERIAL-xxxx-xxxx-xxxx\'');
        } else {
          const req = await fetch(`https://imperialb.in/api/checkApiToken/${msg.content}`);
          const verifyToken = await req.json();
          if (verifyToken.success) {
            const newUser = new Users({
              userId: msg.author.id,
              apiToken: msg.content
            })
            newUser.save()
              .then(() => throwSuccess(msg, 'Successfully linked your API token to your Discord account!'))
          } else {
            throwError(msg, 'That API token isn\'t valid!')
          }
        }
      })
    } else {
      throwError(msg, 'Please insert a valid API token!')
    }
  } else {
    msg.author
      .send('Please reply to this DM with a valid API token! \n\n Ex: `IMPERIAL-xxxx-xxx-xxxx`')
      .then(msg.reply('I\'ve attempted to send you a DM!'))
  }
}