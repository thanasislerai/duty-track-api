import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TaskService } from "./task.service";

@ApiTags()
@Controller("task")
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
}
