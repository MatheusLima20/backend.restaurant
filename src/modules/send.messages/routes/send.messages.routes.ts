import { Router } from "express";
import { SendMessagesController } from "../controller/SendMessagesController";

const routes = Router();

//#region Send Messages

routes.get(
    "/send-email",
    SendMessagesController.email
);

//#endregion


module.exports = routes;