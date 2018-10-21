# GrpcExample

An app to try out setting up two Node servers that communicate using gRPC

## Commands

Static code generation using protoc:  

```txt
yarn grpc_tools_node_protoc --js_out=import_style=commonjs,binary:. --grpc_out=. main-server/chat.proto
```
