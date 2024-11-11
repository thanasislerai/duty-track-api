import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { Report } from "./report.entity";
import { Repository } from "typeorm";
import { Task, TaskFrequency } from "src/task/task.entity";
import { addDays, format, isBefore, isWithinInterval } from "date-fns";
import { getDayFromString } from "src/task/task.helpers";
import { ReportResponseDto } from "./dto/report-response.dto";
import { getReportTimeLimits, getTaskIds } from "./report.helpers";
import { SubmitReportDto } from "./dto/submit-report.dto";

@Injectable()
export class ReportService {
    constructor(
        @Inject("REPORT_REPOSITORY")
        private readonly reportRepository: Repository<Report>,

        @Inject("TASK_REPOSITORY")
        private readonly taskRepository: Repository<Task>,
    ) {}

    async getReports() {
        const reports = await this.reportRepository
            .createQueryBuilder("report")
            .orderBy("report.createdAt", "DESC") // Sort by createdAt in descending order
            .getMany();

        const reportResponseDtos = await Promise.all(
            reports.map((report) => this.reportResponseBuilder(report)),
        );

        return reportResponseDtos;
    }

    async getDailyReport() {
        const now = new Date();
        const { start, end } = getReportTimeLimits(now);
        const { start: yesterdayStart, end: yesterdayEnd } =
            getReportTimeLimits(addDays(now, -1));
        const isBeforeCreation = isBefore(now, start);

        const report = await this.reportRepository
            .createQueryBuilder("report")
            .where("report.createdAt BETWEEN :start AND :end", {
                start: isBeforeCreation ? yesterdayStart : start,
                end: isBeforeCreation ? yesterdayEnd : end,
            })
            .getOne();

        if (!report) {
            throw new NotFoundException(
                `Δε βρέθηκε η αναφορά για ${format(now, "dd/MM/yyyy")}`,
            );
        }

        return this.reportResponseBuilder(report);
    }

    async getDailyTasks() {
        return await this.taskRepository.find({
            where: {
                enabled: true,
                deleted: false,
                frequency: TaskFrequency.DAILY,
            },
        });
    }

    async getWeeklyTasks(weekDay: string) {
        return await this.taskRepository.find({
            where: {
                enabled: true,
                deleted: false,
                frequency: TaskFrequency.WEEKLY,
                weekDay: getDayFromString(weekDay),
            },
        });
    }

    async reportResponseBuilder(report: Report): Promise<ReportResponseDto> {
        const totalTasks = await Promise.all(
            getTaskIds(report.totalTasks).map((taskId) =>
                this.taskRepository.findOne({
                    where: { id: taskId },
                }),
            ),
        );

        return {
            ...report,
            completedTasks: getTaskIds(report.completedTasks),
            totalTasks,
        };
    }

    async createReport() {
        const now = new Date();
        const today = format(now, "EEEE");
        const dailyTasks = await this.getDailyTasks();
        const weeklyTasks = await this.getWeeklyTasks(today);

        const report = this.reportRepository.create({
            completedTasks: "",
            totalTasks: [...dailyTasks, ...weeklyTasks]
                .map(({ id }) => id)
                .join(","),
        });

        await this.reportRepository.save(report);

        return this.reportResponseBuilder(report);
    }

    async submitDailyReport(id: number, submitReportDto: SubmitReportDto) {
        const now = new Date();
        const report = await this.reportRepository.findOne({ where: { id } });

        if (!report) {
            throw new NotFoundException(`Η αναφορά δε βρέθηκε`);
        }

        const { author, completedTasks } = submitReportDto;

        // Create a Set of task IDs for efficient lookup
        const reportTasks = new Set(getTaskIds(report.totalTasks));

        if (report.submittedAt) {
            throw new BadRequestException(`Η αναφορά έχει ήδη υποβληθεί`);
        }

        // Calculate the start and end limits for the report
        const { start, end } = getReportTimeLimits(report.createdAt);

        // Ensure the current time is within the valid range for submission
        if (!isWithinInterval(now, { start, end })) {
            throw new BadRequestException(
                "Δεν είναι δυνατή η εκπρόθεση υποβολή της αναφοράς",
            );
        }

        // Check if the completed tasks are valid
        completedTasks.forEach((taskId) => {
            if (!reportTasks.has(taskId)) {
                throw new BadRequestException(
                    "Η υποβολή θα πρέπει να αφορά μόνο τα task της αναφοράς",
                );
            }
        });

        // Update the report with the new data
        report.author = author;
        report.completedTasks = completedTasks.join(",");
        report.submittedAt = now;

        await this.reportRepository.save(report);
    }
}
