const Discord = require('discord.js');

module.exports = msg => {
  msg.channel.send(new Discord.MessageEmbed().setTitle('Commands').setDescription('All the commands inside IMPERIAL').setColor('#24292e').addFields(
    { name: '!imp post', value: 'After initiating, it will prompt you to paste the code you want to save in a paste' },
    { name: '!imp api', value: 'Sends you a DM so you can hook your API token to your Discord account' },
    { name: '!imp get {documentId}', value: 'Returns code from desired paste' },
    { name: '!imp save {amount of messages to save}', value: 'Gets the amount of messages you\'ve set it to and puts it in a paste' }
  ));
}