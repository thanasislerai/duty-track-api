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
import { CreateDutyDto } from "./dto/create-duty.dto";
import { UpdateDutyDto } from "./dto/update-duty.dto";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Duty } from "./duty.entity";
import { Auth } from "src/auth/auth.decorator";
import { IsAdmin } from "src/guards/guards.decorator";

@ApiTags()
@Controller("duty")
export class DutyController {
    constructor(private readonly dutyService: DutyService) {}

    @ApiOkResponse({ type: [Duty] })
    @Auth()
    @Get()
    async getDuties() {
        return await this.dutyService.findAll();
    }

    @ApiOkResponse({ type: Duty })
    @Auth()
    @Get(":id")
    async getDuty(@Param("id") id: number) {
        return this.dutyService.findById(id);
    }

    @ApiOkResponse({ type: Duty })
    @IsAdmin()
    @Auth()
    @Post()
    createDuty(@Body() createDutyDto: CreateDutyDto) {
        return this.dutyService.createDuty(createDutyDto);
    }

    @ApiOkResponse({ type: Duty })
    @IsAdmin()
    @Auth()
    @Patch(":id")
    async updateDuty(
        @Param("id") id: number,
        @Body() updateDutyDto: UpdateDutyDto,
    ) {
        return this.dutyService.updateDuty(id, updateDutyDto);
    }

    @ApiOkResponse({ type: Duty })
    @IsAdmin()
    @Auth()
    @Delete(":id")
    async deleteDuty(@Param("id") id: number) {
        return this.dutyService.deleteDuty(id);
    }
}
