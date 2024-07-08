import dayjs = require("dayjs");
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
            const createdAt = dayjs(order.createdAt).subtract(3, "hours")
                .format('DD/MM/YYYY HH:mm:ss');
            values.push({
                id: order.id,
                isOpen: order.isOpen,
                amount: order.amount,
                productName: order.description,
                value: order.value,
                status: order.status,
                createdBy: users[index].name,
                createdAt: createdAt
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
            const createdAt = dayjs(order.createdAt).subtract(3, "hours")
                .format('DD/MM/YYYY HH:mm:ss');
            const updatedAt = dayjs(order.updatedAt).subtract(3, "hours")
                .format('DD/MM/YYYY HH:mm:ss');
            values.push({
                id: order.id,
                isOpen: order.isOpen,
                amount: order.amount,
                productName: order.description,
                value: order.value,
                updatedBy: users[index].name,
                paymentMethod: order.paymentMethod,
                createdAt: createdAt,
                updatedAt: updatedAt,
            });
        });

        return {
            orders: values,
            total: total,
        }

    },
};
