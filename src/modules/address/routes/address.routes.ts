import { Router } from "express";
import { VerifyJWTMiddleware } from "../../files/services/security/verifications/VerifyJWTMiddleware";
import { AddressController } from "../controller/AddressController";


const routes = Router();

routes.get(
    "/address/:id",
    VerifyJWTMiddleware.verifyJWT,
    AddressController.getByUserId
);


module.exports = routes;
