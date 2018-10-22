// GENERATED CODE -- DO NOT EDIT!
'use strict';
var grpc = require('grpc');
var chat_pb = require('./chat_pb.js');
function serialize_example_Message(arg) {
    if (!(arg instanceof chat_pb.Message)) {
        throw new Error('Expected argument of type example.Message');
    }
    return new Buffer(arg.serializeBinary());
}
function deserialize_example_Message(buffer_arg) {
    return chat_pb.Message.deserializeBinary(new Uint8Array(buffer_arg));
}
var ChatService = exports.ChatService = {
    join: {
        path: '/example.Chat/join',
        requestStream: true,
        responseStream: true,
        requestType: chat_pb.Message,
        responseType: chat_pb.Message,
        requestSerialize: serialize_example_Message,
        requestDeserialize: deserialize_example_Message,
        responseSerialize: serialize_example_Message,
        responseDeserialize: deserialize_example_Message,
    },
    send: {
        path: '/example.Chat/send',
        requestStream: false,
        responseStream: false,
        requestType: chat_pb.Message,
        responseType: chat_pb.Message,
        requestSerialize: serialize_example_Message,
        requestDeserialize: deserialize_example_Message,
        responseSerialize: serialize_example_Message,
        responseDeserialize: deserialize_example_Message,
    },
};
exports.ChatClient = grpc.makeGenericClientConstructor(ChatService);
//# sourceMappingURL=chat_grpc_pb.js.map