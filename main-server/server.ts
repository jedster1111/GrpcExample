import protoLoader from "@grpc/proto-loader";
import grpc from "grpc";

const server = new grpc.Server();
const SERVER_ADDRESS = "0.0.0.0:5001";

// Load protobuf
const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("protos/chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);

const users: any = [];

function join(call: any, callback: any) {
  users.push(call);
  notifyChat({ user: "Server", text: "new user joined ..." });
}

function send(call: any, callback: any) {
  notifyChat(call.request);
}

function notifyChat(message: any) {
  users.forEach((user: any) => {
    user.write(message);
  });
}

server.addService(proto.example.Chat.service, { join, send });
server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
server.start();
