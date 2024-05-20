import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { CompanyEntity as CompanyEntity } from "./CompanyEntity";
import { PlatformEntity } from "./PlatformEntity";
import { UserTypeEntity } from "./UserTypeEntity";

@Entity({ name: "user" })
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, })
    cpf: string;

    @ManyToOne(() => CompanyEntity, (company) => company.id, { nullable: true })
    @JoinColumn({ name: "fk_company" })
    fkCompany: CompanyEntity;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column({ nullable: false })
    password: string;

    @ManyToOne(() => UserTypeEntity, (type) => type.id)
    @JoinColumn({ name: "fk_user_type" })
    fkUserType: UserTypeEntity;

    @ManyToOne(() => PlatformEntity, (platform) => platform.id)
    @JoinColumn({ name: "fk_platform" })
    fkPlatform: PlatformEntity;

    @Column({ name: "is_active", default: true })
    isActive: boolean;

    @Column({ name: 'created_by', nullable: true })
    createdBy: number;

    @Column({ name: "updated_by", nullable: true })
    updatedBy: number;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
