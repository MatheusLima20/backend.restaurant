import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { OrderEntity } from "./OrdersEntity";
import { UserEntity } from "./UserEntity";

@Entity({ name: "charges" })
export class ChargesEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => OrderEntity, (order) => order.id)
    @JoinColumn({ name: "fk_order" })
    fkOrder: OrderEntity;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: "fk_user" })
    fkUser: UserEntity;


    @Column({ name: "is_pay", default: false })
    isPay: boolean;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;

}
