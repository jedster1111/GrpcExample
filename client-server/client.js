const protoLoader = require("@grpc/proto-loader");
const grpc = require("grpc");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("./chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);

const REMOTE_SERVER = "0.0.0.0:5001";

let username;

const client = new proto.example.Chat(
  REMOTE_SERVER,
  grpc.credentials.createInsecure()
);

function startChat() {
  const channel = client.join({ user: username });

  channel.on("data", onData);

  rl.on("line", text => {
    client.send({ user: username, text }, res => {});
  });
}

function onData(message) {
  if (message.user === username) {
    return;
  }
  console.log(`${message.user}: ${message.text}`);
}

rl.question("What's your name? ", answer => {
  username = answer;

  startChat();
});
