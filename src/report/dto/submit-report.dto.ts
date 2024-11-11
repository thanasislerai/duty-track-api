import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SubmitReportDto {
    @IsNotEmpty({ message: "Παρακαλούμε εισάγετε το όνομά σας" })
    @IsString()
    author: string;

    @IsArray()
    @IsNumber({}, { each: true })
    completedTasks: number[];
}
