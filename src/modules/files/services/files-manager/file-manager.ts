import dayjs from 'dayjs';
import { File } from 'formidable';
import * as fs from 'fs';
import * as path from 'path';

const STORE_ROOT = path.resolve(__dirname, '../../../archives');

export interface StoredFile {
    name: string;
    originalName?: string | null;
    path: string;
}

export const FileManager = {

    store(file: File, storePath: string): StoredFile {

        const originalName =
            file.originalFilename?.replace(/ /g, '_');

        const fileName =
            `${dayjs().format('HH-mm-ss_YYYY-MM-DD')}_${originalName}`;

        const oldPath = file.filepath;

        const newPath = path.resolve(
            STORE_ROOT,
            storePath,
            fileName
        );

        fs.renameSync(oldPath, newPath);

        return {
            name: fileName,
            originalName,
            path: storePath,
        };
    },

    download(archivePath: string) {

        return path.resolve(
            STORE_ROOT,
            archivePath
        );
    },

    delete(archivePath: string) {

        const filePath = path.resolve(
            STORE_ROOT,
            archivePath
        );

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    },
};