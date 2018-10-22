"use strict";
var protoLoader = require("@grpc/proto-loader");
var grpc = require("grpc");
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var proto = grpc.loadPackageDefinition(protoLoader.loadSync("./chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}));
var REMOTE_SERVER = "0.0.0.0:5001";
var username;
var client = new proto.example.Chat(REMOTE_SERVER, grpc.credentials.createInsecure());
function startChat() {
    var channel = client.join({ user: username });
    channel.on("data", onData);
    rl.on("line", function (text) {
        client.send({ user: username, text: text }, function (res) { });
    });
}
function onData(message) {
    if (message.user === username) {
        return;
    }
    console.log(message.user + ": " + message.text);
}
rl.question("What's your name? ", function (answer) {
    username = answer;
    startChat();
});
//# sourceMappingURL=client.js.map