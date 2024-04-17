import { Router } from "express";
import { SpendingController } from "../controller/SpendingController";
import { VerifyJWTMiddleware } from "../middlwares/validations/VerifyJWTMiddleware";
import { SpendingValidation } from "../validations/SpendingValidation";


const routes = Router();

routes.post(
    "/spending/",
    VerifyJWTMiddleware.verifyJWT,
    SpendingValidation.store,
    SpendingController.store
);


module.exports = routes;
