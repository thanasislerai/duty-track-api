import {
    Allow,
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from "class-validator";
import { TaskFrequency, WeekDay } from "../task.entity";

export class CreateTaskDto {
    @IsNotEmpty({ message: "Η περιγραφή του task δεν μπορεί να είναι κενή" })
    @IsString()
    description: string;

    @IsEnum(TaskFrequency, {
        message: "Τα tasks μπορούν να είναι είτε καθημερινά είτε εβδομαδιαία",
    })
    frequency: TaskFrequency;

    @Allow()
    weekDay: WeekDay;

    @IsBoolean()
    @IsOptional()
    enabled?: boolean;
}
