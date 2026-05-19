import { Router } from "express";
import { ProvisionsController } from "../controller/ProvisionsController";
import { VerifyJWTMiddleware } from "../../../services/security/verifications/VerifyJWTMiddleware";
import { ProductValidation } from "../validation/ProductValidation";


const routes = Router();

routes.get(
    "/product/",
    VerifyJWTMiddleware.verifyJWT,
    ProvisionsController.get
);

routes.get(
    "/plates/",
    VerifyJWTMiddleware.verifyJWT,
    ProvisionsController.getPlates
);

routes.post(
    "/product/",
    VerifyJWTMiddleware.verifyJWT,
    ProductValidation.store,
    ProvisionsController.store
);

routes.patch(
    "/product/:id",
    VerifyJWTMiddleware.verifyJWT,
    ProductValidation.patch,
    ProvisionsController.patch
);


module.exports = routes;
