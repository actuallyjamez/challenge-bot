exports.run = (client, message, args) => {
    const {RichEmbed, MessageCollector} = require('discord.js');
    const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 15000 });
    message.channel.send("Please enter a title");

    let title = '';

    collector.on('collect', message => {
        title = message;
    });

    if (title.length < 1) {
        message.channel.send("You need to specify a title");
        return;
    }
    if(title.length > 50)
    {
        message.channel.send("Title is too long! Please shorten it");
        return;
    }
    
    // const combinedArgs = args.join(' '); 
    // const split = combinedArgs.split(',');
    // const title = split[0];
    
    // if(title.length > 50){
    //     message.channel.send("Title is too long! Please shorten it");
    //     return;
    // }

    const embed = new RichEmbed()
    .setTitle(`Challenge ${title}`)
    .setColor(0xff0000)
    .setDescription('beep boop this is a test');
    message.channel.send(embed);

    console.log(args);


    //////////////////////////////////////////////////////////////////////////////////////////
};  ////got my version working, implemented both of our ideas, both fall back on eachother////
    //////////////////////////////////////////////////////////////////////////////////////////