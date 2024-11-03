import { applyDecorators, UseGuards } from "@nestjs/common";
import { IsAdminGuard } from "./is-admin.guard";
import { CanEditReportGuard } from "./can-edit-report.guard";

export const IsAdmin = () => applyDecorators(UseGuards(IsAdminGuard));

export const CanEditReport = () =>
    applyDecorators(UseGuards(CanEditReportGuard));
