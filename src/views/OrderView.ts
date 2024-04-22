import { OrderEntity } from "../entity/OrdersEntity";
import dayjs = require("dayjs");

export const OrderView = {
    getByTable: (orders: Array<OrderEntity>) => {
        
        return orders.map((order) => {

            return {
                id: order.id,
                isOpen: order.isOpen,
                amount: order.amount,
                productName: order.description,
                value: order.value,
            };
        });
    },
};
