import { Router } from "express";
import { VerifyJWTMiddleware } from "../services/security/verifications/VerifyJWTMiddleware";
import { RawMaterialController } from "../controller/RawMaterialController";
import { RawMaterialValidation } from "../validations/RawMaterialValidation";


const routes = Router();

routes.get(
    "/raw-material/:id",
    VerifyJWTMiddleware.verifyJWT,
    RawMaterialValidation.getById,
    RawMaterialController.getById,
);

routes.get(
    "/profit-plates/",
    VerifyJWTMiddleware.verifyJWT,
    RawMaterialController.getProfit
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

routes.patch(
    "/raw-material-low-stock/:orderid/:productid",
    VerifyJWTMiddleware.verifyJWT,
    RawMaterialValidation.patchLowStock,
    RawMaterialController.patchLowStock
);

routes.delete(
    "/raw-material/:id",
    VerifyJWTMiddleware.verifyJWT,
    RawMaterialValidation.delete,
    RawMaterialController.delete
);

module.exports = routes;
