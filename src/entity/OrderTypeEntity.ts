import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

export type OrderType =
    | "Prato"
    | "Guarnição"
    | "Bebida"
    | "Sobremesa"
    | "Petisco"
    ;

@Entity({ name: "order_type" })
export class OrderTypeEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: OrderType;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
