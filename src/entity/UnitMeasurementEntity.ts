import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

export type Unit =
      "Kilo" 
    | "Litro" 
    | "Unidade" 
    | "Gramas"
    | "Caixa"
    | "Mililitros"
    | "Pacote"
    ;

@Entity({ name: "unit_measurement" })
export class UnitMeasurementEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: Unit;

    @Column()
    description: string;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
