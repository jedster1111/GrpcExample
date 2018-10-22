"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var grpc_1 = __importDefault(require("grpc"));
var chat_grpc_pb_1 = require("../chat_grpc_pb");
var server = new grpc_1.default.Server();
var SERVER_ADDRESS = "0.0.0.0:5001";
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
var users = [];
var join = function (call) {
    call.on("data", function (note) {
        users.push(call);
        notifyChat({ user: "Server", text: "new user joined ..." });
    });
};
function send(call, callback) {
    notifyChat(call.request);
}
function notifyChat(message) {
    users.forEach(function (user) {
        user.write(message);
    });
}
// TODO still lacking type safety here!
server.addService(chat_grpc_pb_1.ChatService, { join: join, send: send });
server.bind(SERVER_ADDRESS, grpc_1.default.ServerCredentials.createInsecure());
server.start();
//# sourceMappingURL=server.js.map