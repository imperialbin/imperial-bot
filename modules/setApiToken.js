const Users = require('../models/User');
const fetch = require('node-fetch')

module.exports = async (msg, client) => {
  if (msg.channel.type == 'dm') {
    if (msg.content.includes('IMPERIAL-')) {
      Users.findOne({ userId: msg.author.id }, async (err, user) => {
        if (user) {
          msg.channel.send('You already have an API token hooked up to your discord account!')
        } else {
          const req = await fetch(`https://imperialb.in/api/checkApiToken/${msg.content}`);
          const verifyToken = await req.json();
          if (verifyToken.success) {
            msg.channel.send('API token is valid!')
            const newUser = new Users({
              userId: msg.author.id,
              apiToken: msg.content
            })
            newUser.save()
              .then(() => msg.channel.send('Successfully saved your api token!'))
          } else {
            msg.channel.send('API token is not valid!')
          }
        }
      })
    } else {
      msg.channel.send('Please insert a valid API token!')
    }
  } else {
    client.users.cache.get(msg.author.id).send('Please reply to this DM with a valid API token! \n\n Ex: `IMPERIAL-xxxx-xxx-xxxx`');
  }
}