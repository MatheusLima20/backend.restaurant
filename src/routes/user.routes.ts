import { Router } from "express";
import { UserController } from "../controller/UserController";
import { Authorization } from "../middlwares/validations/AuthorizationMiddleware";
import { VerifyJWTMiddleware } from "../middlwares/validations/VerifyJWTMiddleware";
import { UserValidation } from "../validations/UserValidation";


const routes = Router();

routes.get(
    "/verify-login",
    VerifyJWTMiddleware.verifyJWT,
    UserController.verifyLogin
);

routes.get(
    "/users/:userType",
    VerifyJWTMiddleware.verifyJWT,
    UserValidation.getUsers,
    UserController.getUsers
);

routes.get(
    "/user/:id",
    VerifyJWTMiddleware.verifyJWT,
    UserValidation.get,
    UserController.getById
);

routes.get(
    "/search-cep/:cep",
    UserValidation.cep,
    UserController.shearchCep
);

routes.post(
    "/login",
    UserValidation.login,
    Authorization.verifyLogin,
    Authorization.auth
);

routes.post(
    "/platform-register",
    UserValidation.storePlatform,
    UserController.storePlatform
);

routes.post(
    "/customer",
    UserValidation.storeCustomer,
    UserController.storeCustomer
);

routes.post(
    "/adm",
    VerifyJWTMiddleware.verifyJWT,
    UserValidation.storeADM,
    UserController.storeADM
);

routes.post(
    "/employee",
    VerifyJWTMiddleware.verifyJWT,
    UserValidation.storeEmployee,
    UserController.storeEmployee
);

routes.patch(
    "/user/:id",
    VerifyJWTMiddleware.verifyJWT,
    UserValidation.patch,
    UserController.patch
);

routes.patch(
    "/physical-person",
    VerifyJWTMiddleware.verifyJWT,
    UserValidation.patchPhysicalPerson,
    UserController.patchCustomer
);

routes.delete(
    "/user/:id",
    VerifyJWTMiddleware.verifyJWT,
    UserController.delete
);

module.exports = routes;
