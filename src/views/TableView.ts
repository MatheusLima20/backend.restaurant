import { TableEntity } from "../entity/TableEntity ";
import dayjs = require("dayjs");

export const TableView = {
    get: (tables: Array<TableEntity>, isOcuppied: any []) => {

        const valuesTable = [];
        
        tables.map((table) => {

            const createdAt = dayjs(table.createdAt).format('DD/MM/YYYY HH:mm:ss');

            valuesTable.push({
                id: table.id,
                name: table.name,
                createdBy:table.createdBy,
                createdAt: createdAt,
            });
        });
        
        return {
            tables: valuesTable,
            isOcuppied: isOcuppied
        };
    },
};
