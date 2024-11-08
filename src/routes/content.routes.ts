import { Router } from "express";
import { VerifyJWTMiddleware } from "../services/security/verifications/VerifyJWTMiddleware";
import { ContentValidation } from "../validations/ContentValidation";
import { ContentController } from "../controller/ContentController";
import { UploadFile } from "../middlwares/Files/UploadFilesMiddlware";

const routes = Router();

routes.post(
    "/content",
    VerifyJWTMiddleware.verifyJWT,
    ContentController.upload,
    ContentValidation.store,
    ContentController.store
);

routes.patch(
    "/content/:id",
    VerifyJWTMiddleware.verifyJWT,
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
    VerifyJWTMiddleware.verifyJWT,
    ContentValidation.get,
    ContentController.get
);

routes.get(
    "/content-gallery/",
    VerifyJWTMiddleware.verifyJWT,
    ContentController.getGallery
);

routes.get(
    "/article/:id",
    ContentValidation.getByArticle,
    ContentController.getById
);

routes.get("/download/:path/:archive", UploadFile.download);

routes.delete(
    "/content-archive/:id",
    VerifyJWTMiddleware.verifyJWT,
    ContentValidation.delete,
    ContentController.deleteArchive
);

module.exports = routes;
