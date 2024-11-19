import { ContentEntity } from "../entity/ContentEntity";
import { dateFormat } from "../utils/date/date";


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
