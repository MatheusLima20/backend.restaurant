import { Router } from "express";
import { VerifyJWTMiddleware } from "../../../services/security/verifications/VerifyJWTMiddleware";
import { StatesController } from "../controller/StatesController";


const routes = Router();

//#region States

routes.get(
    "/states",
    VerifyJWTMiddleware.verifyJWT,
    StatesController.get
);

//#endregion


module.exports = routes;