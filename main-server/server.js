const protoLoader = require("@grpc/proto-loader");
const grpc = require("grpc");

const server = new grpc.Server();
const SERVER_ADDRESS = "0.0.0.0:5001";

// Load protobuf
const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("./chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);

const users = [];

function join(call, callback) {
  users.push(call);
  notifyChat({ user: "Server", text: "new user joined ..." });
}

function send(call, callback) {
  notifyChat(call.request);
}

function notifyChat(message) {
  users.forEach((user) => {
    user.write(message);
  });
}

server.addService(proto.example.Chat.service, { join, send });
server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
server.start();
