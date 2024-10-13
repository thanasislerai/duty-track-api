import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { dutyProviders } from "./duty.providers";
import { DutyService } from "./duty.service";
import { DutyController } from "./duty.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [DutyController],
    providers: [...dutyProviders, DutyService],
})
export class DutyModule {}
