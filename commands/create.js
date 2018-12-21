exports.run = (client, message, args) => {
    const {
        RichEmbed
    } = require('discord.js');
    // var argv = require('minimist')(args);
    const parseSentence = require('minimist-string');
    let argv = parseSentence(args.join(' '));
    let title;
    let desc;

    if (argv.title && argv.desc) {
        title = argv.title;
        desc = argv.desc;

    } else if (argv._[0].length > 0) {
        const combinedArgs = args.join(' ');
        const split = combinedArgs.split(',');
        title = split[0];
        desc = split[1];
        

    } else {
        message.reply("`create --title <title> --desc <description>`");
        return
    }

    // if (args.length < 1) {
    //     message.channel.send("You need to specify a title");
    //     return;
    // }
    // if(args.length > 15)
    // {
    //     message.channel.send("Title is too long! Please shorten it");
    //     return;
    // }

    // const title = args.join(' ');  

    // if(title.length > 50){
    //     message.channel.send("Title is too long! Please shorten it");
    //     return;
    // }

    const embed = new RichEmbed()
        .setTitle(`Challenge ${title}`)
        .setColor(0xff0000)
        .setDescription(`${desc}`);
    message.channel.send(embed);

    // message.channel.send(argv.title).catch(console.error);
};