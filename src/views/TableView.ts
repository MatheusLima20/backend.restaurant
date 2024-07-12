import { OrderEntity } from "../entity/OrdersEntity";
import { TableEntity } from "../entity/TableEntity ";
import dayjs = require("dayjs");

export const TableView = {
    get: (tables: Array<TableEntity>, isOcuppied: any [], amountPendings: OrderEntity []) => {

        const valuesTable = [];
        
        tables.map((table) => {

            const createdAt = dayjs(table.createdAt).subtract(3, "hours")
                .format('DD/MM/YYYY HH:mm:ss');

            valuesTable.push({
                id: table.id,
                name: table.name,
                createdBy:table.createdBy,
                createdAt: createdAt,
            });
        });

        const pendings = amountPendings.map((pendings) => {
            const createdAt = dayjs(pendings.createdAt).subtract(3, "hours")
                .format('DD/MM/YYYY HH:mm:ss');
            return {
                id: pendings.id,
                productName: pendings.description,
                productType: pendings.productType,
                idTable: pendings.fkTable,
                value: pendings.value,
                amount: pendings.amount,
                status: pendings.status,
                createdAt: createdAt,
            }
        });
        
        return {
            tables: valuesTable,
            isOcuppied: isOcuppied,
            amountPendings: pendings,
        };
    },
};
