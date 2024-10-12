import { ReportDuty } from "src/report-duty/report-duty.entity";
import { User } from "src/user/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity('report')
export class Report {
    @PrimaryGeneratedColumn('increment', { type: 'int', unsigned: true })
    id: number;

    @Column({ type: 'date' })
    date: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relationships
    @ManyToOne(() => User, (user) => user.reports)
    user: User;

    @OneToMany(() => ReportDuty, (reportDuty) => reportDuty.report)
    reportDuties: ReportDuty[];
}
