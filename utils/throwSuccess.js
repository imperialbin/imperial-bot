const Discord = require('discord.js');

module.exports = (msg, successMessage) => {
  msg.channel.send(new Discord.MessageEmbed().setTitle('Success!').setDescription(successMessage).setColor(0x4fee54))
}