import { UserEntity } from "@modules/user/entities/UserEntity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";


@Entity({ name: "profile" })
export class ProfileEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    orderAverage!: number;

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: "fk_user" })
    fkUser!: UserEntity;

    @Column({ name: "fk_platform" })
    fkPlatform!: number;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt!: Date;
}
