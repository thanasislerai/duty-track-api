import { DataSource } from "typeorm";
import { Leave } from "./leave.entity";

export const leaveProviders = [
    {
        provide: "LEAVE_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Leave),
        inject: ["DATA_SOURCE"],
    },
];
