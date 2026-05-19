import { ContentEntity } from "../modules/content/entities/ContentEntity";
import { dateFormat } from "../shared/utils/date/date";


export const LogView = {
    get: (contents: Array<ContentEntity>) => {

        return contents.map((content) => {
            return {
                id: content.id,
                title: content.title,
                text: content.text,
                createdAt: content.createdAt
            };
        });
    },
};
