exports.run = (client, message) => {
    const {RichEmbed} = require('discord.js');
    const embed = new RichEmbed()
    .setTitle('test embed')
    .setColor(0xff0000)
    .setDescription('beep boop this is a test');
    message.channel.send(embed);
};