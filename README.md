# GrpcExample

An app to try out setting up two Node servers that communicate using gRPC whilst maintaining type safety with TypeScript.

## Setup

Install dependencies: `yarn`  
Build: `yarn build`. Files will be compiled into `./build`  
Startup main server: `yarn start:main`  
Startup client server (in a different console): `yarn start:client`  
Open multiple consoles to send messages between them.

## Using

[grpc_tools_node_protoc_ts](https://github.com/agreatfool/grpc_tools_node_protoc_ts) is used to generate `.d.ts` files
