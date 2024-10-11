import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Day, Duty, DutyFrequency } from "./duty.entity";
import { CreateDutyDto } from "./dto/create-duty-dto";

@Injectable()
export class DutyService {
    constructor(
        @Inject("DUTY_REPOSITORY")
        private readonly dutyRepository: Repository<Duty>
    ) {}

    async findAll(): Promise<Duty[]> {
        return this.dutyRepository.find()
    }

    async createDuty(
        { title, frequency, weeklyOn }: CreateDutyDto
    ): Promise<Duty> {
        try {
            const duty = this.dutyRepository.create({
                title,
                frequency,
                weeklyOn
            })

            if (frequency === DutyFrequency.WEEKLY && !weeklyOn) {
                throw new BadRequestException('You need to specify a week day.')
            }

            return await this.dutyRepository.save(duty)
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new BadRequestException('A duty with this title already exists.')
            }
        }
    }
}
