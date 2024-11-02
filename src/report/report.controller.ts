import { Body, Controller, Get, Param, Put, Req } from "@nestjs/common";
import { ReportService } from "./report.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/auth/auth.decorator";
import { Request } from "express";
import { IsAdmin } from "src/guards/guards.decorator";
import { AssignReportDto } from "./dto/assign-report.dto";

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
}
