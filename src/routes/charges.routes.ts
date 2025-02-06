import { Router } from "express";
import { ChargesController } from "../controller/ChargesController";
import { VerifyJWTMiddleware } from "../services/security/verifications/VerifyJWTMiddleware";
import { ChargesValidation } from "../validations/ChargesValidation";

const routes = Router();

//#region Send Messages

routes.get(
    "/charges/:type",
    VerifyJWTMiddleware.verifyJWT,
    ChargesController.get
);

routes.post(
    "/payment-platform-credit-card",
    VerifyJWTMiddleware.verifyJWT,
    ChargesValidation.paymentPlatformCreditCard,
    ChargesController.paymentPlatformCreditCard
);

routes.post(
    "/charges",
    VerifyJWTMiddleware.verifyJWT,
    ChargesValidation.store,
    ChargesController.store
);

//#endregion

module.exports = routes;
