import { applyDecorators, UseGuards } from "@nestjs/common";
import { IsAdminGuard } from "./is-admin.guard";

export const IsAdmin = () => applyDecorators(UseGuards(IsAdminGuard));
