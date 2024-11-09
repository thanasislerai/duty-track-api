import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { TaskService } from "./task.service";
import { IsAdmin } from "src/guards/guards.decorator";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./task.entity";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Auth } from "src/auth/auth.decorator";

@ApiTags()
@Controller("task")
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @ApiOkResponse({ type: [Task] })
    @Auth()
    @Get()
    async getTasks() {
        return await this.taskService.getTasks();
    }

    @ApiOkResponse({ type: Task })
    @Auth()
    @Get(":id")
    async getTask(@Param("id") id: number) {
        return await this.taskService.getTask(id);
    }

    @ApiOkResponse({ type: Task })
    @IsAdmin()
    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        return await this.taskService.createTask(createTaskDto);
    }

    @ApiOkResponse({ type: Task })
    @IsAdmin()
    @Patch(":id")
    async updateTask(
        @Param("id") id: number,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        return await this.taskService.updateTask(id, updateTaskDto);
    }

    @ApiOkResponse({ type: Task })
    @IsAdmin()
    @Delete(":id")
    async deleteTask(@Param("id") id: number) {
        return await this.taskService.deleteTask(id);
    }
}
