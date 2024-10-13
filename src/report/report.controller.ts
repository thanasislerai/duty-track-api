import { Controller } from "@nestjs/common";
import { ReportService } from "./report.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags()
@Controller("report")
export class ReportController {
    constructor(private readonly reportService: ReportService) {}
}
