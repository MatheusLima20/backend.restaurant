import { ContentEntity } from "../entity/ContentEntity";

export const ContentView = {
    get: (contents: Array<ContentEntity>) => {
        return contents.map((content) => {

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
                createdAt: content.createdAt,
                updatedAt: content.updatedAt
            };
        });
    },

    getById: (content: ContentEntity) => {

        return {
            id: content.id,
            title: content.title,
            subTitle: content.subTitle,
            text: content.text,
            url: content.url,
            contentType: content.contentType,
            viewsAmount: content.viewsAmount,
            createdAt: content.createdAt,
            updatedAt: content.updatedAt,
            creatorName: content.createdBy.name,
        };
    },
    getByTag: (contents: Array<ContentEntity>) => {
        return contents.map((content) => {

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
                createdAt: content.createdAt,
                updatedAt: content.updatedAt,
                creatorName: content.createdBy.name,
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
