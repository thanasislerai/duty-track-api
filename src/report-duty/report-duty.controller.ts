import { Controller } from "@nestjs/common";
import { ReportDutyService } from "./report-duty.service";

@Controller()
export class ReportDutyController {
    constructor(
        private readonly reportDutyService: ReportDutyService
    ) {}
}
