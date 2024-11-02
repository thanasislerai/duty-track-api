import { DataSource } from "typeorm";
import { Report } from "./report.entity";
import { ReportDuty } from "src/report-duty/report-duty.entity";
import { Duty } from "src/duty/duty.entity";
import { User } from "src/user/user.entity";

export const reportProviders = [
    {
        provide: "REPORT_REPOSITORY",
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Report),
        inject: ["DATA_SOURCE"],
    },
    {
        provide: "REPORT_DUTY_REPOSITORY",
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(ReportDuty),
        inject: ["DATA_SOURCE"],
    },
    {
        provide: "DUTY_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Duty),
        inject: ["DATA_SOURCE"],
    },
    {
        provide: "USER_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ["DATA_SOURCE"],
    },
];
