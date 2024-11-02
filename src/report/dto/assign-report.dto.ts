import { IsNumber } from "class-validator";

export class AssignReportDto {
    @IsNumber()
    userId: number;
}
