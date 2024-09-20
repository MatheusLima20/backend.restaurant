import "reflect-metadata";
import * as express from "express";
import 'process';
import routes from "./routes";
import { customErrors } from "./middlwares/CustomErrors/CelebrationMiddleware";
import * as cors from "cors";
import * as http from "http";
import { dataSource } from "./data.source";
import { Server } from "socket.io";

const host: string = process.env.HOST_NAME;
const port: number = Number.parseInt(process.env.PORT);
const socket_origin: string = String(process.env.SOCKET_ORIGIN);

const app = express();

app.use(express.static(__dirname, { dotfiles: "allow" }));

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: [
        "Accept-Version",
        "Authorization",
        "Credentials",
        "Content-Type",
        "Origin",
    ],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(routes);

app.use(customErrors());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: socket_origin,
        methods: ["GET", "POST", "PATCH"],
    },
});

io.on("connection", (socket) => {

    socket.on("platform", (data) => {
        socket.join(data);
    });

    socket.on("send_orders", (data) => {
        socket.to(data.platform).emit("receive_orders", data);
    });

    socket.on("send_status", (data) => {
        socket.to(data.platform).emit("receive_status", data);
    });
});

dataSource.initialize().then(() => {
    httpServer.listen(port, host, () => {
        return console.log('Server started on port: ' + port + ' 🏆!');
    });
});
