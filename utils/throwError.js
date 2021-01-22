const Discord = require('discord.js');

module.exports = (msg, errMessage) => {
  msg.channel.send(new Discord.MessageEmbed().setTitle('Error!').setDescription(errMessage).setColor(0xee4f4f))
}