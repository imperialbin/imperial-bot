const Discord = require('discord.js');

module.exports = (msg, errMessage) => {
  msg.channel.send(new Discord.MessageEmbed().setTitle('Success!').setDescription(message).setColor(0x4fee54))
}