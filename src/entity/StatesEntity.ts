import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({ name: "states" })
export class StatesEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column()
    uf: string;

    @Column()
    name: string;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
