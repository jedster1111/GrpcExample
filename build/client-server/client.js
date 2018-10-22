"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_1 = __importDefault(require("grpc"));
const readline_1 = __importDefault(require("readline"));
const chat_grpc_pb_1 = require("../proto/chat_grpc_pb");
const chat_pb_1 = require("../proto/chat_pb");
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const REMOTE_SERVER = "0.0.0.0:5001";
let username;
const client = new chat_grpc_pb_1.ChatClient(REMOTE_SERVER, grpc_1.default.credentials.createInsecure());
function startChat() {
    const channel = client.join({ user: username });
    channel.on("data", onData);
    rl.on("line", text => {
        const message = new chat_pb_1.Message();
        message.setUser(username);
        message.setText(text);
        client.send(message, err => {
            console.log(err);
        });
    });
}
function onData(message) {
    if (message.getUser() === username) {
        return;
    }
    console.log(`${message.getUser()}: ${message.getText()}`);
}
rl.question("What's your name?", answer => {
    username = answer;
    startChat();
});
//# sourceMappingURL=client.js.map