import * as http from "http";

export interface IServer {
    server: http.Server;

    start(): void;
}
