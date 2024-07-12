import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

export type ProductType =
    | "PRATO"
    | "GUARNIÇÃO"
    | "BEBIDA"
    | "SOBREMESA"
    | "PETISCO"
    ;

@Entity({ name: "product_type" })
export class ProductTypeEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: ProductType;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
