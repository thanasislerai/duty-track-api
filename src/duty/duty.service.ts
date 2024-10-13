import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Duty, DutyFrequency } from "./duty.entity";
import { CreateDutyDto } from "./dto/create-duty-dto";
import { UpdateDutyDto } from "./dto/update-duty-dto";
import { dutySaveErrorHandler } from "./helpers/duty-save-error-handler";

@Injectable()
export class DutyService {
    constructor(
        @Inject("DUTY_REPOSITORY")
        private readonly dutyRepository: Repository<Duty>,
    ) {}

    async findAll(): Promise<Duty[]> {
        return this.dutyRepository.find();
    }

    async findById(id: number): Promise<Duty> {
        const duty = await this.dutyRepository.findOne({ where: { id } });

        if (!duty) {
            throw new NotFoundException(`Duty with id ${id} does not exist.`);
        }

        return duty;
    }

    async createDuty(createDutyDto: CreateDutyDto): Promise<Duty> {
        try {
            return await this.dutyRepository.save(createDutyDto);
        } catch (error) {
            dutySaveErrorHandler(createDutyDto, error);
        }
    }

    async updateDuty(id: number, updateDutyDto: UpdateDutyDto): Promise<Duty> {
        try {
            const duty = await this.findById(id);

            Object.assign(duty, updateDutyDto);

            if (duty.frequency === DutyFrequency.DAILY) {
                duty.weeklyOn = null;
            }

            return await this.dutyRepository.save(duty);
        } catch (error) {
            dutySaveErrorHandler(updateDutyDto, error);
        }
    }

    async deleteDuty(id: number): Promise<Duty> {
        const duty = await this.findById(id);

        if (!duty) {
            throw new NotFoundException(`Duty with id ${id} does not exist.`);
        }

        return await this.dutyRepository.remove(duty);
    }
}
