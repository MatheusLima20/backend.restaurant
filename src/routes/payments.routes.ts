import { Router } from "express";
import { PaymentsController } from "../controller/PaymentsController";
import { VerifyJWTMiddleware } from "../middlwares/validations/VerifyJWTMiddleware";
import { PaymentsValidation } from "../validations/PaymentsValidation";

const routes = Router();

//#region Send Messages

routes.post(
    "/payment-platform-credit-card",
    VerifyJWTMiddleware.verifyJWT,
    PaymentsValidation.paymentPlatformCreditCard,
    PaymentsController.paymentPlatformCreditCard
);

//#endregion


module.exports = routes;