import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ReportModule } from "./report/report.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { GuardsModule } from "./guards/guards.module";
import { TaskModule } from "./task/task.module";

@Module({
    imports: [
        AuthModule,
        ConfigModule.forRoot(),
        GuardsModule,
        ReportModule,
        TaskModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
