import { DataSource } from "typeorm";
import { ReportDuty } from "./report-duty.entity";

export const reportDutyProviders = [
    {
        provide: "REPORT_DUTY_REPOSITORY",
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(ReportDuty),
        inject: ["DATA_SOURCE"],
    },
];
