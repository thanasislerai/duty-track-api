import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DutyModule } from './duty/duty.module';
import { LeaveModule } from './leave/leave.module';
import { ReportModule } from './report/report.module';
import { ReportDutyModule } from './report-duty/report-duty.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DutyModule,
    LeaveModule,
    ReportModule,
    ReportDutyModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
