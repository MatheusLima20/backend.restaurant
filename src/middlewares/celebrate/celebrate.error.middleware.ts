import { Request, Response, NextFunction } from 'express';
import { CelebrateError, Segments } from 'celebrate';
import { FileUtil } from '../../shared/utils/file/file.util';

export function celebrateErrorMiddleware() {

    return (error: any, request: Request, response: Response, next: NextFunction) => {
        if (!CelebrateError(error, Segments.BODY)) {
            next(error);
            return;
        }

        const errorDetails = error.details;

        const errorValues = errorDetails.values();

        const errorObject = errorValues.next().value.details[0];

        const file = request.body.file;

        if (file) {
            FileUtil.delete(file);
        }

        response.status(400).send({
            error: error.message,
            message: errorObject.message,
        });
    };
}