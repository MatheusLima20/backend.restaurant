import { OrderEntity } from "../entity/OrdersEntity";
import { UserEntity } from "../entity/UserEntity";

export const OrderView = {
    getByDate: (orders: Array<OrderEntity>) => {

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
    getByTable: (orders: Array<OrderEntity>, users: Array<UserEntity>) => {

        const values = [];
        let total = 0;

        orders.map((order, index) => {
            total += order.value * order.amount;
            values.push({
                id: order.id,
                isOpen: order.isOpen,
                amount: order.amount,
                productName: order.description,
                value: order.value,
                createdBy: users[index].name
            });
        });

        return {
            orders: values,
            total: total,
        }

    },
    getByBoxDay: (orders: Array<OrderEntity>, users: Array<UserEntity>) => {

        const values = [];
        let total = 0;
        orders.map((order, index) => {
            total += order.value * order.amount;
            values.push({
                id: order.id,
                isOpen: order.isOpen,
                amount: order.amount,
                productName: order.description,
                value: order.value,
                updatedBy: users[index].name,
            });
        });

        return {
            orders: values,
            total: total,
        }

    },
};
