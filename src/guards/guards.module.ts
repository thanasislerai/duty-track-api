import { Module } from "@nestjs/common";
import { IsAdminGuard } from "./is-admin.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports: [DatabaseModule],
    exports: [JwtAuthGuard, IsAdminGuard],
    providers: [JwtAuthGuard, IsAdminGuard],
})
export class GuardsModule {}
