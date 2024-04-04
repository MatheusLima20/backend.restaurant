import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { PlatformEntity } from "./PlatformEntity";
import { StatesEntity } from "./StatesEntity";
import { UserEntity } from "./UserEntity";

@Entity({ name: "address" })
export class AddressEntity {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column()
    main: boolean;

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: true })
    @JoinColumn({ name: "fk_user" })
    fkUser: UserEntity;

    @ManyToOne(() => PlatformEntity, (platform) => platform.id, { nullable: true })
    @JoinColumn({ name: "fk_platform" })
    fkPlatform: PlatformEntity;

    @ManyToOne(() => StatesEntity, (state) => state.id)
    @JoinColumn({ name: "fk_state" })
    fkState: StatesEntity;

    @Column()
    city: string;

    @Column()
    district: string;

    @Column()
    street: string;

    @Column({ name: "phone_number", type: "bigint" })
    phoneNumber: number;

    @Column({ name: "address_number" })
    addressNumber: number;

    @Column({ name: "address_code_postal" })
    addressCodePostal: number;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
