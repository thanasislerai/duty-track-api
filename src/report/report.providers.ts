import { DataSource } from "typeorm";
import { Report } from "./report.entity";
import { Task } from "src/task/task.entity";

export const reportProviders = [
    {
        provide: "REPORT_REPOSITORY",
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Report),
        inject: ["DATA_SOURCE"],
    },
    {
        provide: "TASK_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
        inject: ["DATA_SOURCE"],
    },
];
