import { BadRequestException } from "@nestjs/common";
import { CreateDutyDto } from "../dto/create-duty-dto";
import { Day, DutyFrequency } from "../duty.entity";
import { UpdateDutyDto } from "../dto/update-duty-dto";

const isWeekDay = (day: string) =>
    Object.keys(Day)
        .map((k) => Day[k])
        .includes(day);

export const dutySaveErrorHandler = (
    dto: CreateDutyDto | UpdateDutyDto,
    error: any,
) => {
    if (error?.code === "ER_DUP_ENTRY") {
        throw new BadRequestException("A duty with this title already exists.");
    }

    if (error.sqlMessage?.includes("weekly_on_chk")) {
        if (dto.frequency === DutyFrequency.DAILY && !!dto.weeklyOn) {
            throw new BadRequestException("Daily tasks must be done every day");
        }

        if (dto.frequency === DutyFrequency.WEEKLY && !dto.weeklyOn) {
            throw new BadRequestException(
                "You need to specify a week day for a weekly task",
            );
        }
    }

    if (
        !isWeekDay(dto.weeklyOn) &&
        (dto.frequency === DutyFrequency.WEEKLY || !!dto.weeklyOn)
    ) {
        throw new BadRequestException("Please enter a valid week day.");
    }

    throw error;
};
