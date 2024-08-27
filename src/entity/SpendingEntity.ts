import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({ name: "spending" })
export class SpendingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: 'float'})
    value: number;

    @Column({type: 'float'})
    amount: number;

    @Column({name: 'fk_platform'})
    fkPlatform: number;

    @Column({ name: "unitMeasurement" })
    unitMeasurement: string;

    @Column({ name: 'created_by', nullable: true, })
    createdBy: number;

    @Column({ name: "updated_by", nullable: true, })
    updatedBy: number;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
