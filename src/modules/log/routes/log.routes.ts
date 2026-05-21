import { Router } from "express";
import { VerifyJWTMiddleware } from "../../files/services/security/verifications/VerifyJWTMiddleware";
import { LogController } from "../controller/LogController";


const routes = Router();

routes.get(
    "/log/:date",
    VerifyJWTMiddleware.verifyJWT,
    LogController.get
);


module.exports = routes;
