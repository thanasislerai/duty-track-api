import { Module } from "@nestjs/common";
import { IsAdminGuard } from "./is-admin.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { CanEditReportGuard } from "./can-edit-report.guard";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports: [DatabaseModule],
    exports: [JwtAuthGuard, IsAdminGuard, CanEditReportGuard],
    providers: [JwtAuthGuard, IsAdminGuard, CanEditReportGuard],
})
export class GuardsModule {}
