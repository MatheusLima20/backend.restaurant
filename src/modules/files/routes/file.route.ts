import { Router } from 'express';

import {
    downloadFileController,
} from '../controllers/download-file.controller';

const routes = Router();

routes.get(
    '/download/:path/:archive',
    downloadFileController
);

export default routes;