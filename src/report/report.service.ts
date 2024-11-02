import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Report } from "./report.entity";
import { Repository } from "typeorm";
import { format } from "date-fns";
import { Duty, DutyFrequency } from "src/duty/duty.entity";
import { getDayFromString } from "src/duty/helpers/duty-save-error-handler";
import { ReportDuty } from "src/report-duty/report-duty.entity";
import { User } from "src/user/user.entity";
import { Request } from "express";

const dutyPicker = ({ duty, isDone }: ReportDuty) => ({ ...duty, isDone });
const reportPicker = ({ createdAt, date, id, updatedAt, user }: Report) => ({
    createdAt,
    date: format(date, "yyyy-MM-dd"),
    id,
    updatedAt,
    user,
});

const constructReportResponse = (report: Report, duties: ReportDuty[]) => ({
    ...reportPicker(report),
    duties: duties.map(dutyPicker),
});

@Injectable()
export class ReportService {
    constructor(
        @Inject("REPORT_REPOSITORY")
        private readonly reportRepository: Repository<Report>,

        @Inject("DUTY_REPOSITORY")
        private readonly dutyRepository: Repository<Duty>,

        @Inject("REPORT_DUTY_REPOSITORY")
        private readonly reportDutyRepository: Repository<ReportDuty>,

        @Inject("USER_REPOSITORY")
        private readonly userRepository: Repository<User>,
    ) {}

    async getDailyReport(request: Request) {
        const user = request.user as User;
        const today = new Date();
        const dailyReport = await this.reportRepository
            .createQueryBuilder("report")
            .leftJoinAndSelect("report.user", "user")
            .leftJoinAndSelect("report.reportDuties", "reportDuty")
            .leftJoinAndSelect("reportDuty.duty", "duty")
            .where("DATE(report.date) = :date", {
                date: format(today, "yyyy-MM-dd"),
            })
            .getOne();

        if (!dailyReport) {
            return await this.createDailyReport(user);
        }

        return constructReportResponse(dailyReport, dailyReport.reportDuties);
    }

    async createDailyReport(user: User) {
        const today = new Date();
        const dayOfWeek = getDayFromString(format(today, "EEEE"));
        const dailyDuties = await this.dutyRepository.find({
            where: { frequency: DutyFrequency.DAILY },
        });
        const weeklyDuties = await this.dutyRepository.find({
            where: { frequency: DutyFrequency.WEEKLY, weeklyOn: dayOfWeek },
        });
        const report = this.reportRepository.create({
            user,
            date: today,
        });

        await this.reportRepository.save(report);

        const duties = [...dailyDuties, ...weeklyDuties];

        const _reportDuties = duties.map((duty) =>
            this.reportDutyRepository.create({
                report,
                duty,
                isDone: false,
            }),
        );

        const reportDuties =
            await this.reportDutyRepository.save(_reportDuties);

        return constructReportResponse(report, reportDuties);
    }

    async assignReportToUser(userId: number, reportId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        const report = await this.reportRepository.findOne({
            where: { id: reportId },
            relations: ["user", "reportDuties", "reportDuties.duty"],
        });

        if (!report) {
            throw new NotFoundException(
                `Report with id ${reportId} not found.`,
            );
        }

        await this.reportRepository
            .createQueryBuilder()
            .update(Report)
            .set({ user })
            .where("id = :id", { id: reportId })
            .execute();

        const updatedReport = await this.reportRepository.findOne({
            where: { id: reportId },
            relations: ["user", "reportDuties", "reportDuties.duty"], // Load required relations for response
        });

        return constructReportResponse(
            updatedReport,
            updatedReport.reportDuties,
        );
    }
}
