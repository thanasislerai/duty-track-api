import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Task, TaskFrequency } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { taskSaveErrorHandler } from "./task.helpers";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TaskService {
    constructor(
        @Inject("TASK_REPOSITORY")
        private readonly taskRepository: Repository<Task>,
    ) {}

    async getTasks() {
        return await this.taskRepository.find({ where: { deleted: false } });
    }

    async getTask(id: number) {
        const task = await this.taskRepository.findOne({
            where: { id, deleted: false },
        });

        if (!task) {
            throw new NotFoundException(`Το task με id ${id} δεν βρέθηκε`);
        }

        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        try {
            const previouslyDeleted = await this.taskRepository.findOne({
                where: {
                    description: createTaskDto.description,
                    deleted: true,
                },
            });

            if (previouslyDeleted) {
                previouslyDeleted.deleted = false;
                previouslyDeleted.frequency = createTaskDto.frequency;
                previouslyDeleted.weekDay = createTaskDto.weekDay;
                previouslyDeleted.enabled =
                    typeof createTaskDto.enabled === "undefined"
                        ? true
                        : createTaskDto.enabled;

                return await this.taskRepository.save(previouslyDeleted);
            }

            const task = this.taskRepository.create({
                description: createTaskDto.description,
                frequency: createTaskDto.frequency,
                weekDay: createTaskDto.weekDay,
                enabled:
                    typeof createTaskDto.enabled === "undefined"
                        ? true
                        : createTaskDto.enabled,
            });

            return await this.taskRepository.save(task);
        } catch (error) {
            taskSaveErrorHandler(createTaskDto, error);
        }
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
        try {
            const task = await this.taskRepository.findOne({
                where: { id, deleted: false },
            });

            if (!task) {
                throw new NotFoundException(`Το task με id ${id} δεν βρέθηκε`);
            }

            Object.assign(task, updateTaskDto);

            if (task.frequency === TaskFrequency.DAILY) {
                task.weekDay = null;
            }

            return await this.taskRepository.save(task);
        } catch (error) {
            taskSaveErrorHandler(updateTaskDto, error);
        }
    }

    async deleteTask(id: number) {
        const task = await this.taskRepository.findOne({
            where: { id, deleted: false },
        });

        if (!task) {
            throw new NotFoundException(`Το task με id ${id} δεν βρέθηκε`);
        }

        task.deleted = true;

        return await this.taskRepository.save(task);
    }
}
