import { OmitType } from "@nestjs/swagger";
import { User } from "../user.entity";

export class UserResponseDto extends OmitType(User, ["passwordHash"]) {}

export class UserLoginResponseDto {
    token: string;
    user: UserResponseDto;
}
