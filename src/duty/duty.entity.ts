import { ReportDuty } from "src/report-duty/report-duty.entity";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";

enum DutyFrequency {
    DAILY = "daily",
    WEEKLY = "weekly",
}

enum Day {
    MONDAY = "Monday",
    TUESDAY = "Tuesday",
    WEDNESDAY = "Wednesday",
    THURSDAY = "Thursday",
    FRIDAY = "Friday",
    SATURDAY = "Saturday",
    SUNDAY = "Sunday"
}

@Entity()
export class Duty {
    @PrimaryGeneratedColumn(
        "increment",
        { type: "int", unsigned: true },
    )
    id: number;

    @Column({
        nullable: false,
        type: "text",
    })
    title: string;

    @Column({
        nullable: false,
        type: "enum",
        enum: DutyFrequency,
    })
    frequency: DutyFrequency;

    @Column({
        nullable: true,
        type: "enum",
        enum: Day,
        default: null,
    })
    weeklyOn: Day | null;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => ReportDuty, (reportDuty) => reportDuty.duty)
    reportDuties: ReportDuty[];
}
