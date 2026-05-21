import { Request, Response } from 'express';
import { FileManager } from '../services/files-manager/file-manager';

export function downloadFileController(
    request: Request,
    response: Response
) {

    const { path, archive } = request.params;

    const archivePath =
        `${path}/${archive}`;

    const file =
        FileManager.download(archivePath);

    response.sendFile(file);
}