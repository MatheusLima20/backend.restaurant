import { Router } from "express";
import { StatesController } from "../controller/StatesController";
import { VerifyJWTMiddleware } from "../middlwares/validations/VerifyJWTMiddleware";


const routes = Router();

//#region States

routes.get(
    "/states",
    VerifyJWTMiddleware.verifyJWT,
    StatesController.get
);

//#endregion


module.exports = routes;