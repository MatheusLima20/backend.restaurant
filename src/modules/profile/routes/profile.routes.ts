import { Router } from "express";
import { ProfileController } from "../controller/Profile.Controller";
import { VerifyJWTMiddleware } from "../../files/services/security/verifications/VerifyJWTMiddleware";
import { ProfileValidation } from "../validation/ProfileValidation";

const routes = Router();

//#region Profile

routes.get(
    "/profile/:userId",
    VerifyJWTMiddleware.verifyJWT,
    ProfileValidation.getByUserId,
    ProfileController.getByUserId
);

//#endregion

module.exports = routes;
