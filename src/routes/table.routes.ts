import { Router } from "express";
import { VerifyJWTMiddleware } from "../services/security/verifications/VerifyJWTMiddleware";
import { TableController } from "../controller/TableController";
import { TableValidation } from "../validations/TableValidation";


const routes = Router();

routes.get(
    "/tables/",
    VerifyJWTMiddleware.verifyJWT,
    TableController.get
);

routes.post(
    "/table/",
    VerifyJWTMiddleware.verifyJWT,
    TableController.store
);

routes.patch(
    "/table/:id",
    VerifyJWTMiddleware.verifyJWT,
    TableValidation.patch,
    TableController.patch
);


module.exports = routes;
