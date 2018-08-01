var exitHook = require('exit-hook');

var child_process = require("child_process");
global.timidity = child_process.spawn('timidity', ['-iA', '-c', 'timidity.cfg', '-o', '-']);
timidity.on("error", console.error);
timidity.stderr.on("data", data => {
    console.log(data.toString());
});
exitHook(function(){
    timidity.kill();
})


var Discord = require("discord.js");
global.DiscordBot = new Discord.Client();
DiscordBot.login(require('./token'));

DiscordBot.on("ready", async function(){
    console.log("Discord Bot Ready");
    var voiceChannel = DiscordBot.channels.get("339628587747639296");
    var voiceConnection = await voiceChannel.join();
    exitHook(function(){
        voiceChannel.leave();
    });
    var dispatcher = voiceConnection.playConvertedStream(timidity.stdout);
    dispatcher.on('end', reason => console.log("dispatcher ended:", reason));
});
