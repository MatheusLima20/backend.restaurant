import { OrderEntity } from "../entity/OrdersEntity";
import { UserEntity } from "../entity/UserEntity";

export const OrderView = {
    getByDate: (orders: Array<OrderEntity>) => {

        const values = [];
        let total = 0;

        orders.map((order) => {
            total += order.value * order.amount;
            const createdAt = order.createdAt;
            values.push({
                id: order.id,
                isOpen: order.isOpen,
                amount: order.amount,
                productName: order.description,
                productType: order.productType,
                value: order.value,
                deliveryDate: order.deliveryDate,
                createdAt: createdAt,
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
            const createdAt = order.createdAt;
            values.push({
                id: order.id,
                isOpen: order.isOpen,
                amount: order.amount,
                productId: order.fkProductId,
                productName: order.description,
                productType: order.productType,
                value: order.value,
                status: order.status,
                observation: order.observation,
                createdBy: users[index].name,
                createdAt: createdAt,
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
            const createdAt = order.createdAt;
            const updatedAt = order.updatedAt;
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
    getByStatus: (orders: Array<OrderEntity>) => {

        return orders.map((order) => {
            return{
                id: order.id,
                productId: order.fkProductId,
                amount: order.amount,
                value: order.value,
                productName: order.description,
                isCancelled: order.isCancelled,
                idTable: order.fkTable,
                productType: order.productType,
                order: order.order,
                observation: order.observation,
                createdAt: order.createdAt,
            };
        });

    },
};
