import grpc from "grpc";
import { ChatService, IChatServer } from "../proto/chat_grpc_pb";
import { Message } from "../proto/chat_pb";

const server = new grpc.Server();
const SERVER_ADDRESS = "0.0.0.0:5001";

const users: Array<grpc.ServerDuplexStream<Message, Message>> = [];

const join = (
  call: grpc.ServerDuplexStream<Message, Message>,
  callback: any
) => {
  users.push(call);
  const message = new Message();
  message.setUser("Server");
  message.setText("New user joined");
  notifyChat(message);
};

function send(
  call: grpc.ServerUnaryCall<Message>,
  callback: grpc.ServerUnaryCall<Message>
) {
  notifyChat(call.request);
}

function notifyChat(message: Message) {
  users.forEach(user => {
    user.write(message);
  });
}

// TODO still lacking type safety here!
server.addService(ChatService, { join, send });
server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
server.start();
