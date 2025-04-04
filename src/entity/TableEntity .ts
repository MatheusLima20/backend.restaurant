import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";


@Entity({ name: "table" })
export class TableEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ name: "is_active", default: true })
    isActive: boolean;

    @Column({ name: "fk_platform" })
    fkPlatform: number;    

    @Column({ name: "created_by", nullable: true })
    createdBy: number;

    @Column({ name: "updated_by", nullable: true })
    updatedBy: number;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
