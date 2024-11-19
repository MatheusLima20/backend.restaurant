import * as dayjs from "dayjs";
import { NextFunction, Request, Response } from "express";
import { Fields, File, Files, formidable } from "formidable";
import * as fs from "fs";
import * as path from "path";

//#region Files Store

export interface FileParams {
    request: Request;
    response: Response;
    next: NextFunction;
    path: string;
}

export const UploadFile = {
    store: (params: FileParams) => {
        const form = formidable({});

        try {
            form.parse(params.request, (error: any, fields: Fields, files: Files) => {
                const file: File = (files.file as File[]) [0];

                if (!file) {
                    params.request.body = { ...fields };
                    params.next();
                }

                const storePath = params.path;
                const originalName = file.originalFilename.replace(/ /g, '_');
                const name = dayjs().format("HH-mm-ss_YYYY-MM-DD") + "_" + originalName;

                const oldPath = file.filepath;
                const storeRoot = '../../../archives';
                const newPath = path.resolve(
                    __dirname,
                    `${storeRoot}${storePath}`,
                    name
                );

                const archivePath = storePath + name;

                const newFile = { name: name, originalName, path: storePath };
                params.request.body = { file: newFile, path: archivePath, ...fields };
                fs.renameSync(oldPath, newPath);
                params.next();
            });
        } catch (error) {
            return params.response.json({
                error,
                message: "Falha ao salvar arquivo.",
            });
        }
    },

    download: (request: Request, response: Response) => {

        const params = request.params;

        const archive = params.archive;

        const archivePath = params.path;

        const storeRoot = '../../../archives';

        try {

            const file = path.resolve(__dirname, `${storeRoot}/${archivePath}/`, archive);

            response.sendFile(file);

        } catch (error) {
            response.status(404).send({
                error,
                message: "Arquivo não encontrado.",
            });
        }

    },

    delete: (archive: string) => {
        const storeRoot = '../../../archives';
        const newPath = path.resolve(
            __dirname,
            `${storeRoot}${archive}`
        );

        fs.unlinkSync(newPath);
    },
};


//#endregion
