import { Router } from "express";;
import { ContentValidation } from "../validation/ContentValidation";
import { ContentController } from "../controller/ContentController";
import { verifyJWTMiddleware } from "../../../auth/middlewares/verify-jwt.middleware";

const routes = Router();

routes.post(
    "/content",
    verifyJWTMiddleware.verifyJWT,
    ContentController.upload,
    ContentValidation.store,
    ContentController.store
);

routes.patch(
    "/content/:id",
    verifyJWTMiddleware.verifyJWT,
    ContentController.upload,
    ContentValidation.patch,
    ContentController.patch
);

routes.patch(
    "/content-views/:id",
    ContentValidation.patchViewsAmount,
    ContentController.patchViewsAmount
);

routes.get(
    "/content/:type/:tag/:companyCPFCNPJ",
    ContentController.getByTagAndType
);

routes.get("/content/:type/:companyCPFCNPJ", ContentController.getByType);

routes.get(
    "/search-content/:search/:companyCPFCNPJ",
    ContentController.getBySearch
);

routes.get(
    "/content/:date",
    verifyJWTMiddleware.verifyJWT,
    ContentValidation.get,
    ContentController.get
);

routes.get(
    "/content-gallery/",
    verifyJWTMiddleware.verifyJWT,
    ContentController.getGallery
);

routes.get(
    "/article/:id",
    ContentValidation.getByArticle,
    ContentController.getById
);

routes.delete(
    "/content-archive/:id",
    verifyJWTMiddleware.verifyJWT,
    ContentValidation.delete,
    ContentController.deleteArchive
);

module.exports = routes;
