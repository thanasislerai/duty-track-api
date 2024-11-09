import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

export enum TaskFrequency {
    DAILY = "daily",
    WEEKLY = "weekly",
}

export enum WeekDay {
    MONDAY = "Monday",
    TUESDAY = "Tuesday",
    WEDNESDAY = "Wednesday",
    THURSDAY = "Thursday",
    FRIDAY = "Friday",
    SATURDAY = "Saturday",
    SUNDAY = "Sunday",
}

@Entity("task")
export class Task {
    @PrimaryGeneratedColumn("increment", { type: "int", unsigned: true })
    id: number;

    @Column({ type: "text", nullable: false })
    description: string;

    @Column({
        nullable: false,
        type: "enum",
        enum: TaskFrequency,
    })
    frequency: TaskFrequency;

    @Column({
        nullable: true,
        type: "enum",
        enum: WeekDay,
        default: null,
    })
    weekDay: WeekDay | null;

    @Column({
        type: "boolean",
        nullable: false,
        default: true,
    })
    enabled: boolean;

    @Column({
        type: "boolean",
        nullable: false,
        default: false,
    })
    deleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
