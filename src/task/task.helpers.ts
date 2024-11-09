import { BadRequestException } from "@nestjs/common";
import { TaskFrequency, WeekDay } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

const isWeekDay = (day: string) =>
    Object.keys(WeekDay)
        .map((k) => WeekDay[k])
        .includes(day);

export const getDayFromString = (weekDay: string): WeekDay => {
    switch (weekDay) {
        case "Monday":
            return WeekDay.MONDAY;
        case "Tuesday":
            return WeekDay.TUESDAY;
        case "Wednesday":
            return WeekDay.WEDNESDAY;
        case "Thursday":
            return WeekDay.THURSDAY;
        case "Friday":
            return WeekDay.FRIDAY;
        case "Saturday":
            return WeekDay.SATURDAY;
        case "Sunday":
            return WeekDay.SUNDAY;
        default:
            throw new BadRequestException("Μη έγκυρη ημέρα");
    }
};

export const dutySaveErrorHandler = (
    dto: CreateTaskDto | UpdateTaskDto,
    error: any,
) => {
    if (error.sqlMessage?.includes("week_day_chk")) {
        if (dto.frequency === TaskFrequency.DAILY && !!dto.weekDay) {
            throw new BadRequestException(
                "Τα καθημέρινά task θα πρέπει να γίνονται κάθε μέρα",
            );
        }

        if (dto.frequency === TaskFrequency.WEEKLY && !dto.weekDay) {
            throw new BadRequestException(
                "Θα πρέπει να καθορίσετε μια ημέρα της εβδομάδας για ένα εβδομαδιαίο task",
            );
        }
    }

    if (
        !isWeekDay(dto.weekDay) &&
        (dto.frequency === TaskFrequency.WEEKLY || !!dto.weekDay)
    ) {
        throw new BadRequestException(
            "Παρακαλώ εισάγετε μια έγκυρη ημέρα της εβδομάδας",
        );
    }

    throw error;
};
