import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { ReportDutyController } from "./report-duty.controller";
import { reportDutyProviders } from "./report-duty.providers";
import { ReportDutyService } from "./report-duty.service";

@Module({
    imports: [DatabaseModule],
    controllers: [ReportDutyController],
    providers: [
        ...reportDutyProviders,
        ReportDutyService
    ]
})
export class ReportDutyModule {}
