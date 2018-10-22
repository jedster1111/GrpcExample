import protoLoader from "@grpc/proto-loader";
import grpc from "grpc";
import readline from "readline";

import { ChatClient, ChatService } from "../chat_grpc_pb";
import { Message } from "../chat_pb";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// const proto = grpc.loadPackageDefinition(
//   protoLoader.loadSync("./chat.proto", {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     defaults: true,
//     oneofs: true
//   })
// );

const REMOTE_SERVER = "0.0.0.0:5001";

let username: string;

// const client = new proto.example.Chat(
//   REMOTE_SERVER,
//   grpc.credentials.createInsecure()
// );

const client = new ChatClient(REMOTE_SERVER, grpc.credentials.createInsecure());

function startChat() {
  const channel = client.join({ user: username });

  channel.on("data", onData);

  rl.on("line", text => {
    client.send({ user: username, text }, res => {});
  });
}

function onData(message: Message.AsObject) {
  if (message.user === username) {
    return;
  }
  console.log(`${message.user}: ${message.text}`);
}

rl.question("What's your name? ", answer => {
  username = answer;

  startChat();
});
