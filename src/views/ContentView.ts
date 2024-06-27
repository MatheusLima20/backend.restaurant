import dayjs = require("dayjs");
import { ContentEntity } from "../entity/ContentEntity";

export const ContentView = {
    get: (contents: Array<ContentEntity>) => {
        return contents.map((content) => {

            const createdAt = dayjs(content.createdAt).subtract(3, "hours")
                .format('DD/MM/YYYY HH:mm:ss');
            const updatedAt = dayjs(content.updatedAt).subtract(3, "hours")
                .format('DD/MM/YYYY HH:mm:ss');

            return {
                id: content.id,
                title: content.title,
                subTitle: content.subTitle,
                path: content.path,
                fileName: content.fileName,
                url: content.url,
                text: content.text,
                tag: content.tag,
                visible: content.visible,
                contentType: content.contentType,
                viewsAmount: content.viewsAmount,
                createdAt: createdAt,
                updatedAt: updatedAt
            };
        });
    },

    getById: (content: ContentEntity) => {


        const createdAt = dayjs(content.createdAt).subtract(3, "hours")
            .format('DD/MM/YYYY HH:mm:ss');
        const updatedAt = dayjs(content.updatedAt).subtract(3, "hours")
            .format('DD/MM/YYYY HH:mm:ss');

        return {
            id: content.id,
            title: content.title,
            subTitle: content.subTitle,
            text: content.text,
            url: content.url,
            contentType: content.contentType,
            viewsAmount: content.viewsAmount,
            createdAt: createdAt,
            updatedAt: updatedAt,
        };
    },
    getByTag: (contents: Array<ContentEntity>) => {
        return contents.map((content) => {

            const createdAt = dayjs(content.createdAt).subtract(3, "hours")
                .format('DD/MM/YYYY HH:mm:ss');
            const updatedAt = dayjs(content.updatedAt).subtract(3, "hours")
                .format('DD/MM/YYYY HH:mm:ss');

            return {
                id: content.id,
                title: content.title,
                subTitle: content.subTitle,
                path: content.path,
                fileName: content.fileName,
                url: content.url,
                text: content.text,
                tag: content.tag,
                contentType: content.contentType,
                viewsAmount: content.viewsAmount,
                createdAt: createdAt,
                updatedAt: updatedAt,
            };
        });
    },
    getImages: (contents: Array<ContentEntity>) => {
        return contents.map((content) => {
            const filePath = content.fileName
                ? content.path + content.fileName
                : null;

            const host = process.env.PRODUCTION_HOST;

            const imageUrl = filePath
                ? `${host}/download${filePath} `
                : null;

            return {
                id: content.id,
                src: imageUrl,
                name: content.fileName,
                alt: content.title,
                tag: content.tag,
            };
        });
    },
};
