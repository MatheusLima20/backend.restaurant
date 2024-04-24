import { OrderEntity } from "../entity/OrdersEntity";

export const OrderView = {
    getByTable: (orders: Array<OrderEntity>) => {

        const values = [];
        let total = 0;

        orders.map((order) => {
            total += order.value * order.amount;
            values.push({
                id: order.id,
                isOpen: order.isOpen,
                amount: order.amount,
                productName: order.description,
                value: order.value,
            });
        });

        return {
            orders: values,
            total: total,
        }

    },
};
