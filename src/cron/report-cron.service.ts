import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { format } from "date-fns";
import { ReportService } from "src/report/report.service";

@Injectable()
export class ReportCronService {
    constructor(private readonly reportService: ReportService) {}

    private readonly logger = new Logger(ReportCronService.name);

    private async handleDailyReportCron() {
        const now = new Date();
        try {
            await this.reportService.createReport();
            this.logger.log(
                `Daily report for ${format(now, "dd/MM/yyyy")} created at ${format(now, "HH:mm:ss")}`,
            );
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : JSON.stringify(error);
            this.logger.error(
                `There was an error creating daily report: ${errorMessage}`,
            );
        }
    }

    @Cron("30 7 * * 1-5")
    async handleWeekdayReportCron() {
        await this.handleDailyReportCron();
    }

    @Cron("30 9 * * 6,0")
    async handleWeekEndReportCron() {
        await this.handleDailyReportCron();
    }
}
