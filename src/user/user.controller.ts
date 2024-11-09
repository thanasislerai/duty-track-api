import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserLoginResponseDto } from "./dto/user-login-response.dto";
import { UserLoginDto } from "./dto/user-login.dto";

@ApiTags()
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOkResponse({ type: UserLoginResponseDto })
    @Post("login")
    async login(@Body() userLoginDto: UserLoginDto) {
        return await this.userService.login(userLoginDto);
    }
}
