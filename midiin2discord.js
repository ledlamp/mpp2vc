

var child_process = require("child_process");
var timidity = child_process.spawn('timidity', ['-iA', '-c', 'timidity.cfg', '-o', '-']);
timidity.on("error", console.error);
timidity.stderr.on("data", data => {
    console.log(data.toString());
});


var Discord = require("discord.js");
var DiscordBot = new Discord.Client();
DiscordBot.login(require('./token'));

DiscordBot.on("ready", async function(){
    console.log("Discord Bot Ready");
    var voiceChannel = DiscordBot.channels.get("339628587747639296");
    var voiceConnection = await voiceChannel.join();
    var dispatcher = voiceConnection.playConvertedStream(timidity.stdout);
    dispatcher.on('end', reason => console.log("dispatcher ended:", reason));
})

DiscordBot.on("message", async message => {
    if (message.content.startsWith("!listen")) {
        await message.react("🆗");
        gClient.setChannel(message.content.substr(7));
    } else if (message.content.startsWith("!restart")) {
        await message.react("🆗");
        process.exit();
    }
});
