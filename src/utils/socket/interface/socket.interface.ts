import { SocketClass } from "../socket";


export interface ISocket {

    reaction (hear: string, talk: string): void;

    runSocket(socket: SocketClass): void;

};
