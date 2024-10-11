import { Controller } from "@nestjs/common";
import { LeaveService } from "./leave.service";

@Controller()
export class LeaveController {
    constructor(
        private readonly leaveService: LeaveService
    ) {}
}
