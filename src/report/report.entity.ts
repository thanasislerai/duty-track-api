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

    @Column({ type: "varchar", length: 200, nullable: false })
    author: string;

    // Store as comma-separated string but handle as an array
    @Column({ type: "text", nullable: false })
    private _completedTasks: string;

    @Column({ type: "text", nullable: false })
    private _totalTasks: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    get completedTasks(): number[] {
        return this._completedTasks
            ? this._completedTasks.split(",").map(Number)
            : [];
    }

    set completedTasks(tasks: number[]) {
        this._completedTasks = tasks.join(",");
    }

    // Getter and Setter for totalTasks as an array
    get totalTasks(): number[] {
        return this._totalTasks ? this._totalTasks.split(",").map(Number) : [];
    }

    set totalTasks(tasks: number[]) {
        this._totalTasks = tasks.join(",");
    }
}
