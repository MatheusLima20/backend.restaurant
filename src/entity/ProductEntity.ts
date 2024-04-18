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

    @Column({ name: "fk_platform" })
    fkPlatform: number;

    @Column({ name: "value", type: 'float' })
    value: number;

    @Column({ name: "amount", type: 'float', default: 0 })
    amount: number;

    @ManyToOne(
        () => UnitMeasurementEntity, 
        (unitMeasurement) => unitMeasurement.id, { nullable: true }
    )
    @JoinColumn({ name: "fk_unit__measurement" })
    fkUnitMeasurement: UnitMeasurementEntity;

    @Column({ name: "is_active", default: true })
    isActive: boolean;

    @Column({ name: "show", default: true })
    show: boolean;

    @Column({name: 'created_by', nullable: true })
    createdBy: number;

    @Column({name: "updated_by", nullable: true })
    updatedBy: number;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
