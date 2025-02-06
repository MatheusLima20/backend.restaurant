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
import { ChargesType } from "../@types/charges";
import { BoxDayEntity } from "./BoxDayEntity";


@Entity({ name: "charges" })
export class ChargesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => OrderEntity, (order) => order.id, { nullable: true })
    @JoinColumn({ name: "fk_order" })
    fkOrder: OrderEntity;

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
    @JoinColumn({ name: "fk_user" })
    fkUser: UserEntity;

    @ManyToOne(() => BoxDayEntity, (boxday) => boxday.id, { nullable: true })
    @JoinColumn({ name: "fk_boxday" })
    fkBoxDay: BoxDayEntity;

    @Column()
    platform: number;

    @Column({ nullable: true })
    payer: string;

    @Column({ nullable: true })
    type: ChargesType;

    @Column({ nullable: true })
    payday: string;

    @Column({ name: "paid_in", nullable: true })
    paidIn: string;

    @Column({ type: "float" })
    value: number;

    @Column({ nullable: true })
    description: string;

    @Column({ name: "is_pay", default: false })
    isPay: boolean;

    @CreateDateColumn({ type: "timestamp", name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
