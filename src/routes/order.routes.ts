import { Router } from "express";
import { OrderController } from "../controller/OrderController";
import { OrderValidation } from "../validations/OrderValidation";
import { VerifyJWTMiddleware } from "../services/security/verifications/VerifyJWTMiddleware";


const routes = Router();

routes.get(
    "/order/sell/:date",
    VerifyJWTMiddleware.verifyJWT,
    OrderValidation.getByDate,
    OrderController.getByDate
);

routes.get(
    "/order/:id",
    VerifyJWTMiddleware.verifyJWT,
    OrderValidation.getByTable,
    OrderController.getByTable
);

routes.get(
    "/order-boxday/:id/:isCancelled",
    VerifyJWTMiddleware.verifyJWT,
    OrderValidation.getByBoxDay,
    OrderController.getByBoxDay
);

routes.get(
    "/order-status/:status",
    VerifyJWTMiddleware.verifyJWT,
    OrderValidation.getByStatus,
    OrderController.getByStatus
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
    "/orders/",
    VerifyJWTMiddleware.verifyJWT,
    OrderValidation.patchs,
    OrderController.patchs
);

routes.patch(
    "/order/:idTable1/:idTable2",
    VerifyJWTMiddleware.verifyJWT,
    OrderValidation.patchChangeTableOrders,
    OrderController.patchChangeTableOrders
);


module.exports = routes;
