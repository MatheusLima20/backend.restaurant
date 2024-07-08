import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from "typeorm";
import { UserEntity } from "./UserEntity";

export type OrderStatus = "pendente" | "processando" | "finalizado";

@Entity({ name: "order" })
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column({ name: "payment_method", nullable: true })
    paymentMethod: string;

    @Column({ name: "status", default: "pendente"})
    status: string;

    @Column({ name: "delivery_forecast", nullable: true })
    deliveryForecast: Date;

    @Column({ name: "delivery_date", nullable: true })
    deliveryDate: Date;

    @Column({ type:'float', nullable: true })
    value: number;

    @Column({ type:'float', nullable: true })
    amount: number;

    @Column({ name: "tracking_code", nullable: true })
    trackingCode: string;

    @Column({ name: "is_delivered", default: false, nullable: true  })
    isDelivered: boolean;

    @Column({ name: "is_cancelled", default: false, nullable: true  })
    isCancelled: boolean;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: "fk_final_client", })
    fkFinalClient: UserEntity;

    @Column({ name: "fk_platform" })
    fkPlatform: number;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: "fk_client" })
    fkClient: UserEntity;

    @Column({ name: "fk_box_day", nullable: true })
    fkBoxDay: number;

    @Column({ name: "fk_table", nullable: true })
    fkTable: number;

    @Column({ name: "is_open", default: true })
    isOpen: boolean;

    @Column({ name: 'created_by', nullable: true  })
    createdBy: number;

    @Column({ name: "updated_by", nullable: true })
    updatedBy: number;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
