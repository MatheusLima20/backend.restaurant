import { Router } from "express";
import { OrderController } from "../controller/OrderController";
import { OrderValidation } from "../validations/OrderValidation";
import { VerifyJWTMiddleware } from "../middlwares/validations/VerifyJWTMiddleware";


const routes = Router();

routes.get(
    "/order/:id",
    VerifyJWTMiddleware.verifyJWT,
    OrderValidation.getByTable,
    OrderController.getByTable
);

routes.post(
    "/order/",
    VerifyJWTMiddleware.verifyJWT,
    OrderValidation.store,
    OrderController.store
);

routes.patch(
    "/order/:id",
    VerifyJWTMiddleware.verifyJWT,
    OrderValidation.patch,
    OrderController.patch
);

routes.patch(
    "/order/:idTable1/:idTable2",
    VerifyJWTMiddleware.verifyJWT,
    OrderValidation.patchChangeTableOrders,
    OrderController.patchChangeTableOrders
);


module.exports = routes;
