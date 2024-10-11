import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { LeaveController } from "./leave.controller";
import { leaveProviders } from "./leave.providers";
import { LeaveService } from "./leave.service";

@Module({
    imports: [DatabaseModule],
    controllers: [LeaveController],
    providers: [
        ...leaveProviders,
        LeaveService
    ],
})
export class LeaveModule {}
