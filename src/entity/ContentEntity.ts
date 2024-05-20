import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({ name: "content" })
export class ContentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "path", nullable: true })
    path: string;

    @Column({ name: "type", nullable: true })
    contentType: string;

    @Column({ name: "file_name", nullable: true })
    fileName: string;

    @Column({ name: "url", nullable: true })
    url: string;

    @Column({ name: "tag", nullable: true })
    tag: string;

    @Column({ name: 'text', type: 'mediumtext', nullable: true })
    text: string;

    @Column({ name: "title", nullable: true })
    title: string;

    @Column({ name: "sub_title", type: 'mediumtext', nullable: true })
    subTitle: string;

    @Column({ name: "visible", default: false })
    visible: boolean;

    @Column({ name: "views_amount", default: 0 })
    viewsAmount: number;

    @Column({ name: "fk_platform" })
    fkPlatform: number;

    @Column({ name: "created_by", nullable: true })
    createdBy: number;

    @Column({ name: "updated_by", nullable: true })
    updatedBy: number;

    @CreateDateColumn({ type: "timestamp", name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", name: "updated_at" })
    updatedAt: Date;
}
