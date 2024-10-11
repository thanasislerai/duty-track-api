import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { ReportController } from "./report.controller";
import { reportProviders } from "./report.providers";
import { ReportService } from "./report.service";

@Module({
    imports: [DatabaseModule],
    controllers: [ReportController],
    providers: [
        ...reportProviders,
        ReportService
    ],
})
export class ReportModule {}
