import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { ProvisionsEntity } from "./ProvisionsEntity";

@Entity({ name: "raw_material" })
export class RawMaterialEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProvisionsEntity, (fkProduct) => fkProduct.id, { nullable: true })
    @JoinColumn({ name: "fk_product" })
    fkProduct: ProvisionsEntity;

    @ManyToOne(() => ProvisionsEntity, (fkRawMaterial) => fkRawMaterial.id, { nullable: true })
    @JoinColumn({ name: "fk_raw_material" })
    fkRawMaterial: ProvisionsEntity;

    @Column({ name: "fk_platform" })
    fkPlatform: number;

    @Column({ name: "amount", type: 'float' })
    amount: number;

    @Column({name: 'created_by', nullable: true })
    createdBy: number;

    @Column({name: "updated_by", nullable: true })
    updatedBy: number;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
