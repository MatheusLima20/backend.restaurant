import { Router } from "express";
import { PlatformController } from "../controller/PlatformController";
import { PlatformValidation } from "../validations/PlatformValidation";


const routes = Router();

routes.get(
    "/platform/:cnpj",
    PlatformValidation.get,
    PlatformController.getByCNPJ
);


module.exports = routes;
