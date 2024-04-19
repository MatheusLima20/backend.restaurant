import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";


@Entity({ name: "Table" })
export class TableEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

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
