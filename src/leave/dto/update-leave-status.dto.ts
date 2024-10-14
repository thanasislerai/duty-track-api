import { IsEnum, IsNotEmpty } from "class-validator";
import { LeaveStatus } from "../leave.entity";

export class UpdateLeaveStatusDto {
    @IsNotEmpty({ message: "A leave status cannot be empty" })
    @IsEnum(LeaveStatus, {
        message: "A leave request can be Requested, Approved or Declined",
    })
    status: LeaveStatus;
}
