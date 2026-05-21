import { Request, Response, NextFunction } from 'express';
import { formidable, Fields, Files, File } from 'formidable';
import { FileManager } from '../services/files-manager/file-manager';

export function uploadFilesMiddleware(storePath: string) {

    return (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        const form = formidable({});

        form.parse(request, async (error, fields: Fields, files: Files) => {

            if (error) {
                return response.status(400).json({
                    error,
                    message: 'Upload error.',
                });
            }

            const uploadedFiles = files.file as File[];

            const file = uploadedFiles?.[0];

            if (!file) {
                request.body = { ...fields };

                next();
                return;
            }

            const savedFile = await FileManager.store(file, storePath);

            request.body = {
                file: savedFile,
                path: savedFile.path + savedFile.name,
                ...fields,
            };

            next();
        });
    };
}