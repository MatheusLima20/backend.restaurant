import { Router } from "express";
import { VerifyJWTMiddleware } from "../services/security/verifications/VerifyJWTMiddleware";
import { ProductTypeController } from "../controller/ProductTypeController";


const routes = Router();

//#region States

routes.get(
    "/product-type",
    VerifyJWTMiddleware.verifyJWT,
    ProductTypeController.get
);

//#endregion


module.exports = routes;