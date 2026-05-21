import { Router } from "express";
import { VerifyJWTMiddleware } from "../../files/services/security/verifications/VerifyJWTMiddleware";
import { TableController } from "../controller/TableController";
import { TableValidation } from "../validation/TableValidation";


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
