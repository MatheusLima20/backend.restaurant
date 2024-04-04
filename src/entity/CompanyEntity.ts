import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({ name: "companies" })
export class CompanyEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ name: "cpf_cnpj" })
    cpfcnpj: string;

    @Column({ name: "company_name" })
    companyName: string;

    @Column({ name: "corporate_name" })
    corporateName: string;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
