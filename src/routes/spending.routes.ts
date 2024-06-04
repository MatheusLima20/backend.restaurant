import { Router } from "express";
import { SpendingController } from "../controller/SpendingController";
import { VerifyJWTMiddleware } from "../middlwares/validations/VerifyJWTMiddleware";
import { SpendingValidation } from "../validations/SpendingValidation";


const routes = Router();

routes.get(
    "/spending/:date",
    VerifyJWTMiddleware.verifyJWT,
    SpendingValidation.get,
    SpendingController.get
);

routes.post(
    "/spending/",
    VerifyJWTMiddleware.verifyJWT,
    SpendingValidation.store,
    SpendingController.store
);

routes.patch(
    "/spending/:id",
    VerifyJWTMiddleware.verifyJWT,
    SpendingValidation.patch,
    SpendingController.patch
);


module.exports = routes;
