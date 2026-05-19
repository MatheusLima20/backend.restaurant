import { SocketClass } from "../socket";

export type Interation = {
    hear: string,
    talk: string,
}

export interface ISocket {

    reaction (hear: string, talk: string): void;

    runSocket(socket: SocketClass): void;

};
