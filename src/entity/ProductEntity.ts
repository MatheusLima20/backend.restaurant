import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { UnitMeasurementEntity } from "./UnitMeasurementEntity";

@Entity({ name: "product" })
export class ProductEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ name: "name" })
    name: string;

    @Column({ name: "value", type: 'float' })
    value: number;

    @Column({ name: "amount", type: 'float' })
    amount: number;

    @ManyToOne(
        () => UnitMeasurementEntity, 
        (unitMeasurement) => unitMeasurement.id, { nullable: true }
    )
    @JoinColumn({ name: "fk_unit__measurement" })
    unitMeasurement: UnitMeasurementEntity;

    @Column({ name: "is_active" })
    isActive: boolean;

    @Column({ name: "show" })
    show: boolean;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
