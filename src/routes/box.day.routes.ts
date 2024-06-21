import { Router } from "express";
import { VerifyJWTMiddleware } from "../middlwares/validations/VerifyJWTMiddleware";
import { BoxDayController } from "../controller/BoxDayController";
import { BoxDayValidation } from "../validations/BoxDayValidation";


const routes = Router();

routes.get(
    "/box-day/",
    VerifyJWTMiddleware.verifyJWT,
    BoxDayController.get
);

routes.post(
    "/box-day/",
    VerifyJWTMiddleware.verifyJWT,
    BoxDayValidation.store,
    BoxDayController.store
);

routes.patch(
    "/box-day/:id",
    VerifyJWTMiddleware.verifyJWT,
    BoxDayValidation.patch,
    BoxDayController.patch
);


module.exports = routes;
