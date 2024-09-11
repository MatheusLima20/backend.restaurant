import { Router } from "express";
import { PaymentsController } from "../controller/PaymentsController";

const routes = Router();

//#region Send Messages

routes.post(
    "/payment",
    PaymentsController.store
);

//#endregion


module.exports = routes;