import { TableEntity } from "../entity/TableEntity ";
import dayjs = require("dayjs");

export const TableView = {
    get: (tables: Array<TableEntity>) => {
        
        return tables.map((table) => {

            const createdAt = dayjs(table.createdAt).format('DD/MM/YYYY HH:mm:ss');

            return {
                id: table.id,
                name: table.name,
                createdBy:table.createdBy,
                createdAt: createdAt,
            };
        });
    },
};
