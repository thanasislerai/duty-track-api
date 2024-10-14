import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Leave, LeaveStatus } from "./leave.entity";
import { Request } from "express";
import { CreateLeaveDto } from "./dto/create-leave.dto";
import { User } from "src/user/user.entity";

@Injectable()
export class LeaveService {
    constructor(
        @Inject("LEAVE_REPOSITORY")
        private readonly leaveRepository: Repository<Leave>,
    ) {}

    async createLeave(
        request: Request,
        { startDate, endDate }: CreateLeaveDto,
    ) {
        const user = request.user as User;
        const leave = new Leave();

        leave.user = user;
        leave.startDate = startDate;
        leave.endDate = endDate;
        leave.status = LeaveStatus.REQUESTED;

        return await this.leaveRepository.save(leave);
    }

    async updateLeaveStatus(id: number, status: LeaveStatus) {
        const leave = await this.leaveRepository.findOne({ where: { id } });

        if (!leave) {
            throw new NotFoundException(`There is no leave with id ${id}`);
        }

        leave.status = status;

        return await this.leaveRepository.save(leave);
    }
}
