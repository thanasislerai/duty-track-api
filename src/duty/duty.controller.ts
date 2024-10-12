import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { DutyService } from "./duty.service";
import { CreateDutyDto } from "./dto/create-duty-dto";
import { UpdateDutyDto } from "./dto/update-duty-dto";

@Controller('duty')
export class DutyController {
    constructor(
        private readonly dutyService: DutyService
    ) {}

    @Get()
    async getDuties() {
        return await this.dutyService.findAll();
    }

    @Get(':id')
    async getDuty(@Param('id') id: number) {
        return this.dutyService.findById(id);
    }

    @Post()
    createDuty(@Body() createDutyDto: CreateDutyDto) {
        return this.dutyService.createDuty(createDutyDto)
    }

    @Patch(':id')
    async updateDuty(
        @Param('id') id: number,
        @Body() updateDutyDto: UpdateDutyDto
    ) {
        return this.dutyService.updateDuty(id, updateDutyDto)
    }

    @Delete(':id')
    async deleteDuty(@Param('id') id: number) {
        return this.dutyService.deleteDuty(id)
    }
}
