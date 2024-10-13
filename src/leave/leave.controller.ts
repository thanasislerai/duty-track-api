import { Controller } from "@nestjs/common";
import { LeaveService } from "./leave.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags()
@Controller("leave")
export class LeaveController {
    constructor(private readonly leaveService: LeaveService) {}
}
