import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { ReportService } from "./report.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ReportResponseDto } from "./dto/report-response.dto";
import { IsAdmin } from "src/guards/guards.decorator";
import { Auth } from "src/auth/auth.decorator";
import { SubmitReportDto } from "./dto/submit-report.dto";

@ApiTags()
@Controller("report")
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @ApiOkResponse({ type: [ReportResponseDto] })
    @IsAdmin()
    @Get()
    async getReports() {
        return await this.reportService.getReports();
    }

    @ApiOkResponse({ type: ReportResponseDto })
    @Auth()
    @Get("daily")
    async getDailyReport() {
        return await this.reportService.getDailyReport();
    }

    @ApiOkResponse({ type: null })
    @Auth()
    @Patch(":id")
    async submitReport(
        @Param("id") id: number,
        @Body() submitReportDto: SubmitReportDto,
    ) {
        await this.reportService.submitDailyReport(id, submitReportDto);
    }
}
