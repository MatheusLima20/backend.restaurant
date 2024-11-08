import { Router } from "express";
import { AddressController } from "../controller/AddressController";
import { VerifyJWTMiddleware } from "../services/security/verifications/VerifyJWTMiddleware";


const routes = Router();

routes.get(
    "/address/:id",
    VerifyJWTMiddleware.verifyJWT,
    AddressController.getByUserId
);


module.exports = routes;
