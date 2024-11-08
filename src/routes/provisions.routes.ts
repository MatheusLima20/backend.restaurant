import { Router } from "express";
import { VerifyJWTMiddleware } from "../services/security/verifications/VerifyJWTMiddleware";
import { ProvisionsController } from "../controller/ProvisionsController";
import { ProductValidation as ProvisionsValidation } from "../validations/ProductValidation";


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
    ProvisionsValidation.store,
    ProvisionsController.store
);

routes.patch(
    "/product/:id",
    VerifyJWTMiddleware.verifyJWT,
    ProvisionsValidation.patch,
    ProvisionsController.patch
);


module.exports = routes;
