import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class CreateLeaveDto {
    @IsNotEmpty({ message: "You need to specify when your leave starts" })
    @IsDate()
    @Type()
    startDate: Date;

    @IsNotEmpty({ message: "You need to specify when your leave ends" })
    @IsDate()
    @Type()
    endDate: Date;
}
