import "reflect-metadata";
import "process";
import 'module-alias/register';
import { SocketClass } from "./shared/utils/socket/socket";
import { ServerClass, serverClass } from "./services/server/server";
import { databaseClass } from "./services/database/database";

const server: ServerClass = serverClass;

const socket = new SocketClass(server.server);

socket.runSocket(socket);

databaseClass.start();

server.start();