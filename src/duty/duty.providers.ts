import { DataSource } from "typeorm";
import { Duty } from "./duty.entity";

export const dutyProviders = [
    {
        provide: "DUTY_REPOSITORY",
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Duty),
        inject: ["DATA_SOURCE"],
    }
];
