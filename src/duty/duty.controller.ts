import { Body, Controller, Get, Post } from "@nestjs/common";
import { DutyService } from "./duty.service";
import { CreateDutyDto } from "./dto/create-duty-dto";

@Controller('duty')
export class DutyController {
    constructor(
        private readonly dutyService: DutyService
    ) {}

    @Get()
    async getDuties() {
        return await this.dutyService.findAll();
    }

    @Post()
    createDuty(@Body() createDutyDto: CreateDutyDto) {
        return this.dutyService.createDuty(createDutyDto)
    }
}
