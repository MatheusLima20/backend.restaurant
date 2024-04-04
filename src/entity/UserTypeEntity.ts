import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

export type UserType =
    "SUPER" |
    "ADM" |
    "CONSUMIDOR" |
    "REDATOR"
    ;

@Entity({ name: "user_type" })
export class UserTypeEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: UserType;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
