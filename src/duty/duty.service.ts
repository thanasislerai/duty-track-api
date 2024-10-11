import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Duty } from "./duty.entity";

@Injectable()
export class DutyService {
    constructor(
        @Inject("DUTY_REPOSITORY")
        private readonly dutyRepository: Repository<Duty>
    ) {}

    async findAll(): Promise<Duty[]> {
        return this.dutyRepository.find()
    }
}
