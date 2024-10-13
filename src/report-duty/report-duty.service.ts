import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ReportDuty } from "./report-duty.entity";

@Injectable()
export class ReportDutyService {
    constructor(
        @Inject("REPORT_DUTY_REPOSITORY")
        private readonly reportDutyRepository: Repository<ReportDuty>,
    ) {}
}
