# GrpcExample

An app to try out setting up two Node servers that communicate using gRPC

## Commands

Static code generation using protoc:  

```txt
C:\Coding\GrpcExample\node_modules\.bin\grpc_tools_node_protoc --js_out=import_style=commonjs,binary:C:\Coding\GrpcExample --grpc_out=C:\Coding\GrpcExample --plugin=protoc-gen-grpc=C:\Coding\GrpcExample\node_modules\.bin\grpc_tools_node_protoc_plugin.cmd -I C:\Coding\GrpcExample C:\Coding\GrpcExample\chat.proto

C:\Coding\GrpcExample\node_modules\.bin\grpc_tools_node_protoc --plugin=protoc-gen-ts=C:\Coding\GrpcExample\node_modules\.bin\protoc-gen-ts.cmd --ts_out=C:\Coding\GrpcExample -I C:\Coding\GrpcExample\ C:\Coding\GrpcExample\chat.proto
```
