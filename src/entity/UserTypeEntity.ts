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
    "CUSTOMER" |
    "WAITER" |
    "DELIVERYMAN"
    ;

@Entity({ name: "user_type" })
export class UserTypeEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
