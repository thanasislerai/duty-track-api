import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Leave } from "./leave.entity";

@Injectable()
export class LeaveService {
    constructor(
        @Inject("LEAVE_REPOSITORY")
        private readonly leaveRepository: Repository<Leave>
    ) {}
}
