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

    @Column()
    value: number;

    @Column()
    frequency: string;

    @Column()
    maxTables: number;

    @Column()
    maxUsers: number;

    @Column()
    taxDelivery: number;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
