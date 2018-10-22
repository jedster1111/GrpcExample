"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_1 = __importDefault(require("grpc"));
const chat_grpc_pb_1 = require("../proto/chat_grpc_pb");
const chat_pb_1 = require("../proto/chat_pb");
const server = new grpc_1.default.Server();
const SERVER_ADDRESS = "0.0.0.0:5001";
const users = [];
const join = (call) => {
    users.push(call);
    const message = new chat_pb_1.Message();
    message.setUser("Server");
    message.setText("New user joined");
    notifyChat(message);
};
function send(call) {
    notifyChat(call.request);
}
function notifyChat(message) {
    users.forEach(user => {
        user.write(message);
    });
}
server.addService(chat_grpc_pb_1.ChatService, { join, send });
server.bind(SERVER_ADDRESS, grpc_1.default.ServerCredentials.createInsecure());
server.start();
//# sourceMappingURL=server.js.map