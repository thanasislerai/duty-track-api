import { Controller } from "@nestjs/common";
import { ReportDutyService } from "./report-duty.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags()
@Controller("report-duty")
export class ReportDutyController {
    constructor(private readonly reportDutyService: ReportDutyService) {}
}
