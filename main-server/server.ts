import protoLoader from "@grpc/proto-loader";
import grpc, { Call } from "grpc";

import { ChatClient, ChatService } from "../chat_grpc_pb";
import { Message } from "../chat_pb";

const server = new grpc.Server();
const SERVER_ADDRESS = "0.0.0.0:5001";

// Load protobuf
// const proto = grpc.loadPackageDefinition(
//   protoLoader.loadSync("./chat.proto", {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     defaults: true,
//     oneofs: true
//   })
// );

const users: Array<grpc.ServerDuplexStream<Message, Message>> = [];

const join = (
  call: grpc.ServerDuplexStream<Message, Message>,
  callback: any
) => {
  users.push(call);
  notifyChat({ user: "Server", text: "new user joined ..." });
};

function send(
  call: grpc.ServerUnaryCall<Message.AsObject>,
  callback: grpc.ServerDuplexStream<Message, Message>
) {
  notifyChat(call.request);
}

function notifyChat(message: Message.AsObject) {
  users.forEach(user => {
    user.write(message);
  });
}

// TODO still lacking type safety here!
server.addService(ChatService, { join, send });
server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
server.start();
