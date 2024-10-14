import { Body, Controller, Param, Post, Patch, Req } from "@nestjs/common";
import { LeaveService } from "./leave.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/auth/auth.decorator";
import { CreateLeaveDto } from "./dto/create-leave.dto";
import { Leave } from "./leave.entity";
import { Request } from "express";
import { UpdateLeaveStatusDto } from "./dto/update-leave-status.dto";
import { IsAdmin } from "src/guards/guards.decorator";

@ApiTags()
@Controller("leave")
export class LeaveController {
    constructor(private readonly leaveService: LeaveService) {}

    @ApiOkResponse({ type: Leave })
    @Auth()
    @Post()
    async createLeave(
        @Req() request: Request,
        @Body() createLeave: CreateLeaveDto,
    ) {
        return await this.leaveService.createLeave(request, createLeave);
    }

    @ApiOkResponse({ type: Leave })
    @IsAdmin()
    @Auth()
    @Patch(":id")
    async updateLeaveStatus(
        @Param("id") id: number,
        @Body() { status }: UpdateLeaveStatusDto,
    ) {
        return await this.leaveService.updateLeaveStatus(id, status);
    }
}
