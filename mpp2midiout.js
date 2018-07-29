
var midi = require('midi');
var MidiOutput = new midi.output();
var portCount = MidiOutput.getPortCount();
var portConnected = false;
console.log(`Found ${portCount} MIDI ports:`);
for (let portNumber = 0; portNumber < portCount; portNumber++) {
    let portName = MidiOutput.getPortName(portNumber)
    console.log(`Port ${portNumber}: ${portName}`);
    if (portName == "TiMidity 128:0" && !portConnected) {
        MidiOutput.openPort(portNumber);
        portConnected = true;
    }
}
if (!portConnected) {console.error("Couldn't find MIDI port"); process.exit(1);}


var MIDI_TRANSPOSE = -12;
var MIDI_KEY_NAMES = ["a-1", "as-1", "b-1"];
var bare_notes = "c cs d ds e f fs g gs a as b".split(" ");
for(var oct = 0; oct < 7; oct++) {
    for(var i in bare_notes) {
        MIDI_KEY_NAMES.push(bare_notes[i] + oct);
    }
}
MIDI_KEY_NAMES.push("c7");
var gMidiOutTest = function(note_name, vel, delay_ms) {
    var note_number = MIDI_KEY_NAMES.indexOf(note_name);
    if(note_number == -1) return;
    note_number = note_number + 9 - MIDI_TRANSPOSE;

    //MidiOutput.wait(delay_ms).send([0x90, note_number, Math.floor(vel)]); //JZZ
    setTimeout(function(){
        MidiOutput.sendMessage([0x90, note_number, vel]);
    }, delay_ms);
}


var Client = require("mpp-client");
var gClient = new Client("ws://www.multiplayerpiano.com:443");
gClient.setChannel("lobby");
gClient.start();
gClient.on("hi", ()=> console.log("MPP Client Ready"));

gClient.on("n", function(msg) {
    var t = msg.t - gClient.serverTimeOffset + 1000 - Date.now();

    for(var i = 0; i < msg.n.length; i++) {
        var note = msg.n[i];
        var ms = t + (note.d || 0);
        if(ms < 0) {
            ms = 0;
        }
        else if(ms > 10000) continue;
        if(note.s) {
            gMidiOutTest(note.n, 0, ms);
        } else {
            var vel = (typeof note.v !== "undefined")? parseFloat(note.v) : DEFAULT_VELOCITY;
            if(vel < 0) vel = 0; else if (vel > 1) vel = 1;
            gMidiOutTest(note.n, vel * 127, ms);
        }
    }
});