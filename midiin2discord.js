
var ALSA = require("alsa");

{
    let device = 'default',                   // ALSA default device
        channels = 2,                         // Stereo
        rate = 44100,                         // Sample rate
        format = ALSA.FORMAT_S16_LE,          // PCM format (signed 16 bit LE int)
        access = ALSA.ACCESS_RW_INTERLEAVED,  // Access mode
        latency = 500;                        // Desired latency in milliseconds
    var AudioCapture = new ALSA.Capture(device, channels, rate, format, access, latency)
}


var Discord = require("discord.js");
var DiscordBot = new Discord.Client();
DiscordBot.login("todo");

DiscordBot.on("ready", async function(){
    var voiceChannel = DiscordBot.channels.get("339628587747639296");
    var voiceConnection = await voiceChannel.join();
    voiceConnection.playStream(AudioCapture);
})