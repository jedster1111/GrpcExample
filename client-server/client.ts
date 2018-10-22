import grpc from "grpc";
import readline from "readline";

import { ChatClient, ChatService } from "../proto/chat_grpc_pb";
import { Message } from "../proto/chat_pb";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const REMOTE_SERVER = "0.0.0.0:5001";

let username: string;

const client = new ChatClient(REMOTE_SERVER, grpc.credentials.createInsecure());

function startChat() {
  const channel = client.join({ user: username });

  channel.on("data", onData);

  rl.on("line", text => {
    const message = new Message();
    message.setUser(username);
    message.setText(text);
    client.send(message, err => {
      console.log(err);
    });
  });
}

function onData(message: Message) {
  if (message.getUser() === username) {
    return;
  }
  console.log(`${message.getUser()}: ${message.getText()}`);
}

rl.question("What's your name?", answer => {
  username = answer;

  startChat();
});
