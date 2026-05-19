import { Router } from "express";
import { UserTypeController } from "../controller/UserTypeController";


const routes = Router();

routes.get("/user-type", UserTypeController.get);


module.exports = routes;
