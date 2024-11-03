import { IsBoolean, IsNumber } from "class-validator";

export class UpdateReportDutyStatusDto {
    @IsNumber()
    dutyId: number;

    @IsBoolean()
    isDone: boolean;
}
