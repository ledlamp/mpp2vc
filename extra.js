
// bot commands
DiscordBot.on("message", async message => {
    if (message.content.startsWith("!listen")) {
        await message.react("🆗");
        gClient.setChannel(message.content.substr(7));
    } else if (message.content.startsWith("!restart")) {
        await message.react("🆗");
        process.exit();
    } else if (message.content == "!help") {
        message.channel.send("`!listen <room name>` to listen to the room in voice chat.\n`!restart` if it's not working.")
    }
});

// set nick to current listening channel
DiscordBot.once("ready", function(){
    let lastRoom;
    gClient.on("ch", msg => {
        if (msg.ch._id !== lastRoom) {
            let nick = `\udb40\udc00Listen to MPP (${msg.ch._id})`;
            nick = nick.length > 32 ? nick.substr(0,30) + '…)' : nick;
            DiscordBot.guilds.forEach(guild => guild.me.setNickname(nick));
            lastRoom = msg.ch._id;
        }
    });
});