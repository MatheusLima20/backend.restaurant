import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

export type Plan = 'Iniciante' | 'Profissional' | 'Premium';

@Entity({ name: "plan" })
export class PlanEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: Plan;

    @Column({ name: 'month_value', type: "float" })
    monthValue: number;

    @Column({ name: 'annual_value', type: "float" })
    annualValue: number;

    @Column({ name: 'max_boxday' })
    maxBoxDay: number;

    @Column({ name: 'max_tables' })
    maxTables: number;

    @Column({ name: 'max_users' })
    maxUsers: number;

    @Column({ name: 'tax_delivery' , type: "float" })
    taxDelivery: number;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
