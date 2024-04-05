import { Router } from "express";
import { VerifyJWTMiddleware } from "../middlwares/validations/VerifyJWTMiddleware";
import { ProductController } from "../controller/ProductController";
import { ProductValidation } from "../validations/ProductValidation";


const routes = Router();

routes.post(
    "/product/",
    VerifyJWTMiddleware.verifyJWT,
    ProductValidation.store,
    ProductController.store
);


module.exports = routes;
