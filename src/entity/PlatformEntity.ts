import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { CompanyEntity } from "./CompanyEntity";

@Entity({ name: "platform" })
export class PlatformEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => CompanyEntity, (company) => company.id)
    @JoinColumn({ name: "fk_company" })
    fkCompany: CompanyEntity;

    @Column({ name: "is_active", default: true })
    isActive: boolean;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;

}
