module.exports = (client, guild) => {
    console.log("Joined a new guild: " + guild.name);
    //Your other stuff like adding to guildArray
    guild.createChannel("Producer Challenge", "category")
        .then(parent => {
            for (let i of client.config.channels) {
                guild.createChannel(`${client.config.channelPrefix}${i}`, "text")
                    .then(channel => {
                        channel.setParent(parent.id)
                            .catch(console.error);
                    })
            }
        })
        .catch(console.error);
};