# GrpcExample

An very simple chat app to try out setting up two Node servers that communicate using gRPC whilst maintaining type safety with TypeScript.

![example usage](http://puu.sh/BQNuh/b920beb932.png)

## Setup

**Note the commands below will need to be changed to run on your machine. If on windows just change the file structures in package.json to match your project's location.**

Install dependencies: `yarn`  
Build: `yarn build`. Files will be compiled into `./build`  
Startup main server: `yarn start:main`  
Startup client server (in a different console): `yarn start:client`  
Open multiple consoles to send messages between them.

## Using

[grpc_tools_node_protoc_ts](https://github.com/agreatfool/grpc_tools_node_protoc_ts) is used to generate `.d.ts` files
