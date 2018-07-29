

var child_process = require("child_process");
var timidity = child_process.spawn('timidity', ['-iA', '-c timidity.cfg', '-o -']);



var Discord = require("discord.js");
var DiscordBot = new Discord.Client();
DiscordBot.login(require('./token'));

DiscordBot.on("ready", async function(){
    var voiceChannel = DiscordBot.channels.get("339628587747639296");
    var voiceConnection = await voiceChannel.join();
    voiceConnection.playConvertedStream(timidity.stdout);
})