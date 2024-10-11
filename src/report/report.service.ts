import { Inject, Injectable } from "@nestjs/common";
import { Report } from "./report.entity";
import { Repository } from "typeorm";

@Injectable()
export class ReportService {
    constructor(
        @Inject("REPORT_REPOSITORY")
        private readonly reportRepository: Repository<Report>
    ) {}
}
