import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import { Archive } from '../../utils/file/archive';

export function customErrors() {

    return (error: any, request: Request, response: Response, next: NextFunction) => {
        if (!isCelebrateError(error)) {
            return next(error);
        }

        const errorDetails = error.details;

        const errorValues = errorDetails.values();

        const errorObject = errorValues.next().value.details[0];

        const file = request.body.file;

        if (file) {
            Archive.delete(file);
        }

        return response.status(404).json({
            error: error.message,
            message: errorObject.message,
        });
    };
}