import {
    Allow,
    IsEnum,
    IsNotEmpty,
    IsString,
    MaxLength,
} from "class-validator";
import { Day, DutyFrequency } from "../duty.entity";

export class CreateDutyDto {
    @MaxLength(200, { message: "Too long duty title" })
    @IsNotEmpty({ message: "Duty title cannot be empty" })
    @IsString({ message: "The duty title should be a text" })
    title: string;

    @IsEnum(DutyFrequency, { message: "A duty can either be daily or weekly" })
    frequency: DutyFrequency;

    @Allow()
    weeklyOn: Day;
}
