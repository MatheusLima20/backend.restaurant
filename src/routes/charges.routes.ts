import { Router } from "express";
import { ChargesController } from "../controller/ChargesController";
import { VerifyJWTMiddleware } from "../middlwares/validations/VerifyJWTMiddleware";
import { ChargesValidation } from "../validations/ChargesValidation";

const routes = Router();

//#region Send Messages

routes.post(
    "/payment-platform-credit-card",
    VerifyJWTMiddleware.verifyJWT,
    ChargesValidation.paymentPlatformCreditCard,
    ChargesController.paymentPlatformCreditCard
);

//#endregion


module.exports = routes;