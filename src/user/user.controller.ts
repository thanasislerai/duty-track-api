import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
    UserLoginResponseDto,
    UserResponseDto,
} from "./dto/user-login-response.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { Auth } from "src/auth/auth.decorator";
import { Request } from "express";

@ApiTags()
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOkResponse({ type: UserLoginResponseDto })
    @Post("login")
    async login(@Body() userLoginDto: UserLoginDto) {
        return await this.userService.login(userLoginDto);
    }

    @ApiOkResponse({ type: UserResponseDto })
    @Auth()
    @Get("profile")
    async getUserProfile(@Req() request: Request) {
        return await this.userService.getUserProfile(request);
    }
}
