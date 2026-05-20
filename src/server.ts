import "reflect-metadata";
import "process";
import 'module-alias/register';
import { SocketClass } from "./shared/utils/socket/socket";
import { databaseClass } from "./database/database";
import { serverClass, ServerClass } from "./server/server";
import dotenv = require('dotenv');
dotenv.config();

const server: ServerClass = serverClass;

const socket = new SocketClass(server.server);

socket.runSocket(socket);

databaseClass.start();

server.start();