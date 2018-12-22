exports.run = (client, message, args) => {
    const { RichEmbed, MessageCollector } = require('discord.js');
    let collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 15000, maxMatches: 1 });

    const minTitleLength = 1;
    const maxTitleLength = 50;

    const minDescLength = 1;
    const maxDescLength = 1000;

    message.channel.send("Please enter a title");


    collector.on('collect', message => {
        const title = message.content;

        if (checkInput(message, title, 'Title', minTitleLength, maxTitleLength)) {
            return;
        }

        message.channel.send("Please enter a description of the challenge");

        collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 25000, maxMatches: 1 });

        collector.on('collect', message => {
            const description = message.content;
            console.log(description);
            if (checkInput(message, description, 'Description', minDescLength, maxDescLength)) {
                return;
            }

            //TODO: could be moved? Maybe somewhere else where to have different templates
            const embedDescription =
                `*${description}* \n
             Starting time: 00:00
             End Time: 00:00 \n
             Please react with a ✅ to join this challenge. You will be notified through DMs when the challenge starts!
             @Challenged`
            const embed = new RichEmbed()
                .setTitle(`Challenge: ${title}`)
                .setColor(0xff0000)
                .setDescription(`${embedDescription}`);

            message.channel.send(embed)
                .then(function (message) {
                    message.react("✅");
                }).catch(function () {
                    message.channel.send("oops something went wrong!");
                    console.log("Rejected promise in embedded message");
                });
        });
    });
};

function checkInput(message, input, type, minLength, maxLength) {
    let inError = false;
    if (input.length === 0) {
        message.channel.send(HandleError(ErrorCodes.ERROR_NOT_DEFINED, type));
        inError = true;
    }
    if (input.length < minLength) {
        message.channel.send(HandleError(ErrorCodes.ERROR_TOO_SHORT, type));
        inError = true;
    }
    if (input.length > maxLength) {
        message.channel.send(HandleError(ErrorCodes.ERROR_TOO_LONG, type));
        inError = true;
    }
    return inError;
}

function HandleError(errorCode, type) {
    switch (errorCode) {
        case ErrorCodes.ERROR_NOT_DEFINED:
            return `You need to specify a ${type.toLowerCase()}`;
        case ErrorCodes.ERROR_TOO_SHORT:
            return `Your ${type.toLowerCase()} is too short`;
        case ErrorCodes.ERROR_TOO_LONG:
            return `${uppercaseFirstLetter(type)} is too long! Please shorten it`;
    }
}

function uppercaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + type.slice(1);
}

const ErrorCodes = {
    ERROR_NOT_DEFINED: 0,
    ERROR_TOO_SHORT: 1,
    ERROR_TOO_LONG: 2,
}