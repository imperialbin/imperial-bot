const Users = require('../models/User');
const fetch = require('node-fetch')

// Utilities
const throwError = require('../utils/throwError');
const throwSuccess = require('../utils/throwSuccess');

module.exports = async (msg, client) => {
  if (msg.channel.type == 'dm') {
    if (msg.content.includes('IMPERIAL-')) {
      Users.findOne({ userId: msg.author.id }, async (err, user) => {
        if (user) {
          throwError(msg, 'You already have an API token hooked up to your discord account!')
        } else {
          const req = await fetch(`https://imperialb.in/api/checkApiToken/${msg.content}`);
          const verifyToken = await req.json();
          if (verifyToken.success) {
            const newUser = new Users({
              userId: msg.author.id,
              apiToken: msg.content
            })
            newUser.save()
              .then(() => throwSuccess(msg, 'Successfully set your API token to your Discord account!'))
          } else {
            throwError(msg, 'That API token isn\'t valid!')
          }
        }
      })
    } else {
      throwError(msg, 'Please insert a valid API token!')
    }
  } else {
    client.users.cache.get(msg.author.id).send('Please reply to this DM with a valid API token! \n\n Ex: `IMPERIAL-xxxx-xxx-xxxx`');
  }
}