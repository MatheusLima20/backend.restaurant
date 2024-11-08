import * as http from "http";
import { Server } from "socket.io";
import { ISocket } from "./interface/socket.interface";

let io: Server;
const connection = "connection";
const platform = "platform";

const methods = ["GET", "POST", "PATCH"];

export class SocketClass implements ISocket {

    constructor(server: http.Server, socketOrigin: string) {

        io = new Server(server, {
            cors: {
                origin: socketOrigin,
                methods: methods,
            },
        });
    }    

    reaction (hear: string, talk: string): void {
        
        io.on(connection, (socket) => {

            socket.on(platform, (data) => {
                socket.join(data);
            });
        
            socket.on(hear, (data) => {
                socket.to(data.platform).emit(talk, data);
            });

        });
    };

    runSocket(socket: SocketClass): void {

        socket.reaction("send_orders", "receive_orders");

        socket.reaction("send_status", "receive_status");

    }

}

