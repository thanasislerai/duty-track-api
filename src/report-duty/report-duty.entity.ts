import { Duty } from "../duty/duty.entity";
import { Report } from "../report/report.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('report_duty')
export class ReportDuty {
    @PrimaryColumn({ type: 'int', unsigned: true })
    reportId: number;

    @PrimaryColumn({ type: 'int', unsigned: true })
    dutyId: number;

    @Column({ type: 'boolean' })
    isDone: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relationships
    @ManyToOne(() => Report, (report) => report.reportDuties)
    report: Report;

    @ManyToOne(() => Duty, (duty) => duty.reportDuties)
    duty: Duty;
}
