import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DutyModule } from "./duty/duty.module";
import { LeaveModule } from "./leave/leave.module";
import { ReportModule } from "./report/report.module";
import { ReportDutyModule } from "./report-duty/report-duty.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { GuardsModule } from "./guards/guards.module";

@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot(),
        DutyModule,
        LeaveModule,
        ReportModule,
        ReportDutyModule,
        UserModule,
        GuardsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
