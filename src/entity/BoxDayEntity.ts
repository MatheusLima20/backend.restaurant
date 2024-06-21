import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";


@Entity({ name: "box_day" })
export class BoxDayEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "fk_platform" })
    fkPlatform: number;

    @Column({ name: "start_value" , nullable: false })
    startValue: number;

    @Column({ name: "is_open" , default: true })
    isOpen: boolean;

    @Column({ name: "created_by", nullable: true })
    createdBy: number;

    @Column({ name: "updated_by", nullable: true })
    updatedBy: number;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
