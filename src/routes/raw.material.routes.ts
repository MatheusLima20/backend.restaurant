import { Router } from "express";
import { VerifyJWTMiddleware } from "../middlwares/validations/VerifyJWTMiddleware";
import { RawMaterialController } from "../controller/RawMaterialController";
import { RawMaterialValidation } from "../validations/RawMaterialValidation";


const routes = Router();

routes.get(
    "/raw-material/:id",
    VerifyJWTMiddleware.verifyJWT,
    RawMaterialValidation.get,
    RawMaterialController.getById,
);

routes.post(
    "/raw-material/",
    VerifyJWTMiddleware.verifyJWT,
    RawMaterialValidation.store,
    RawMaterialController.store
);

routes.patch(
    "/raw-material/:id",
    VerifyJWTMiddleware.verifyJWT,
    RawMaterialValidation.patch,
    RawMaterialController.patch
);

routes.delete(
    "/raw-material/",
    VerifyJWTMiddleware.verifyJWT,
    RawMaterialValidation.delete,
    RawMaterialController.delete
);

module.exports = routes;
