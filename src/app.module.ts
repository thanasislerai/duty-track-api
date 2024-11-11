import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ReportModule } from "./report/report.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { GuardsModule } from "./guards/guards.module";
import { TaskModule } from "./task/task.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ReportCronService } from "./cron/report-cron.service";
import { ReportService } from "./report/report.service";
import { reportProviders } from "./report/report.providers";
import { DatabaseModule } from "./database/database.module";

@Module({
    imports: [
        DatabaseModule,
        AuthModule,
        ConfigModule.forRoot(),
        GuardsModule,
        ReportModule,
        ScheduleModule.forRoot(),
        TaskModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        ReportService,
        ReportCronService,
        ...reportProviders,
    ],
})
export class AppModule {}
