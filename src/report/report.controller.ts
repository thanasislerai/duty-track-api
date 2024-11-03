import { Body, Controller, Get, Param, Put, Req } from "@nestjs/common";
import { ReportService } from "./report.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/auth/auth.decorator";
import { Request } from "express";
import { CanEditReport, IsAdmin } from "src/guards/guards.decorator";
import { AssignReportDto } from "./dto/assign-report.dto";
import { UpdateReportDutyStatusDto } from "./dto/update-report-duty-status.dto";

@ApiTags()
@Controller("report")
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @ApiOkResponse({ type: Object })
    @Auth()
    @Get("daily")
    async getDailyReport(@Req() request: Request) {
        return this.reportService.getDailyReport(request);
    }

    @ApiOkResponse({ type: Object })
    @IsAdmin()
    @Auth()
    @Put("assign/:reportId")
    async assignDailyReport(
        @Param("reportId") reportId: number,
        @Body() { userId }: AssignReportDto,
    ) {
        return this.reportService.assignReportToUser(userId, reportId);
    }

    @ApiOkResponse({ type: String, description: "No Content" })
    @CanEditReport()
    @Put(":reportId")
    async updateReportDutiesStatus(
        @Param("reportId") reportId: number,
        @Body() items: UpdateReportDutyStatusDto[],
    ) {
        return this.reportService.updateReportDutiesStatus(reportId, items);
    }
}
