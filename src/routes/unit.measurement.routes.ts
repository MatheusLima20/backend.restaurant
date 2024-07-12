import { Router } from "express";
import { VerifyJWTMiddleware } from "../middlwares/validations/VerifyJWTMiddleware";
import { UnitMeasurementController } from "../controller/UnitMeasurementController";


const routes = Router();

//#region States

routes.get(
    "/unit-measurement",
    VerifyJWTMiddleware.verifyJWT,
    UnitMeasurementController.get
);

//#endregion


module.exports = routes;