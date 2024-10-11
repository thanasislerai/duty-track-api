import { Controller, Get } from "@nestjs/common";
import { DutyService } from "./duty.service";

@Controller('duty')
export class DutyController {
    constructor(
        private readonly dutyService: DutyService
    ) {}

    @Get()
    async getDuties() {
        return await this.dutyService.findAll();
    }
}
