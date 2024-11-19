import { Router } from "express";
import { VerifyJWTMiddleware } from "../services/security/verifications/VerifyJWTMiddleware";
import { LogController } from "../controller/LogContoller";


const routes = Router();

routes.get(
    "/log/:date",
    VerifyJWTMiddleware.verifyJWT,
    LogController.get
);


module.exports = routes;
