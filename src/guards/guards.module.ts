import { Module } from "@nestjs/common";
import { IsAdminGuard } from "./is-admin.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Module({
    exports: [JwtAuthGuard, IsAdminGuard],
    providers: [JwtAuthGuard, IsAdminGuard],
})
export class GuardsModule {}
