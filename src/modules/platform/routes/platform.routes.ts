import { Router } from "express";
import { PlatformValidation } from "../validation/PlatformValidation";
import { PlatformController } from "../controller/PlatformController";


const routes = Router();

routes.get(
    "/platform/:cnpj",
    PlatformValidation.get,
    PlatformController.getByCNPJ
);


module.exports = routes;
