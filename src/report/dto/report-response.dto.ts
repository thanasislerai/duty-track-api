import { OmitType } from "@nestjs/mapped-types";
import { Report } from "../report.entity";
import { Task } from "src/task/task.entity";

export class ReportResponseDto extends OmitType(Report, [
    "totalTasks",
    "completedTasks",
]) {
    completedTasks: number[];
    totalTasks: Task[];
}
