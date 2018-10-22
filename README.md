# GrpcExample

An app to try out setting up two Node servers that communicate using gRPC

## Setup

`yarn`  
install protoc from [protoc releases](https://github.com/protocolbuffers/protobuf/releases)

## Commands

Static code generation using protoc:

```txt
C:\coding\work\GrpcExample\node_modules\.bin\grpc_tools_node_protoc.cmd --js_out=import_style=commonjs,binary:C:\coding\work\GrpcExample --grpc_out=C:\coding\work\GrpcExample --plugin=protoc-gen-grpc=C:\coding\work\GrpcExample\node_modules\.bin\grpc_tools_node_protoc_plugin.cmd -I C:\coding\work\GrpcExample C:\coding\work\GrpcExample\chat.proto

C:\coding\work\GrpcExample\node_modules\.bin\grpc_tools_node_protoc.cmd --plugin=protoc-gen-ts=C:\coding\work\GrpcExample\node_modules\.bin\protoc-gen-ts.cmd --ts_out=C:\coding\work\GrpcExample -I C:\coding\work\GrpcExample C:\coding\work\GrpcExample\chat.proto
```
