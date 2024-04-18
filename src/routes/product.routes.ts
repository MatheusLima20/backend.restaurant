import { Router } from "express";
import { VerifyJWTMiddleware } from "../middlwares/validations/VerifyJWTMiddleware";
import { ProductController } from "../controller/ProductController";
import { ProductValidation } from "../validations/ProductValidation";


const routes = Router();

routes.get(
    "/product/",
    VerifyJWTMiddleware.verifyJWT,
    ProductController.get
);

routes.post(
    "/product/",
    VerifyJWTMiddleware.verifyJWT,
    ProductValidation.store,
    ProductController.store
);

routes.patch(
    "/product/:id",
    VerifyJWTMiddleware.verifyJWT,
    ProductValidation.patch,
    ProductController.patch
);


module.exports = routes;
