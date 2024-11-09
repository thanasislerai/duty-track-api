import {
    Allow,
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
} from "class-validator";
import { TaskFrequency, WeekDay } from "../task.entity";

export class CreateTaskDto {
    @MaxLength(400, {
        message:
            "Η περιγραφή του καθήκοντος θα πρέπει να περιέχει το πολύ 400 χαρακτήρες",
    })
    @IsNotEmpty({ message: "Η περιγραφή του task δεν μπορεί να είναι κενή" })
    @IsString({ message: "Μη έγκυρη περιγραφή task" })
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
