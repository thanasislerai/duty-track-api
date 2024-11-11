import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn("increment", { type: "int", unsigned: true })
    id: number;

    @Column({ type: "datetime", nullable: true, default: null })
    submittedAt: Date | null;

    @Column({ type: "varchar", length: 200, default: null })
    author: string | null;

    @Column({ type: "text" })
    completedTasks: string;

    @Column({ type: "text" })
    totalTasks: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
