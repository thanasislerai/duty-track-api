import * as bcrypt from "bcrypt";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserLoginDto } from "./dto/user-login.dto";
import { JwtService } from "@nestjs/jwt";
import {
    UserLoginResponseDto,
    UserResponseDto,
} from "./dto/user-login-response.dto";
import { Request } from "express";

@Injectable()
export class UserService {
    constructor(
        @Inject("USER_REPOSITORY")
        private readonly userRepository: Repository<User>,

        private readonly jwtService: JwtService,
    ) {}

    async findById(id: number) {
        return await this.userRepository.findOne({ where: { id } });
    }

    async login({
        userName,
        password,
    }: UserLoginDto): Promise<UserLoginResponseDto> {
        const user = await this.userRepository.findOne({ where: { userName } });

        if (!user) {
            throw new UnauthorizedException("Λάθος κωδικός ή όνομα χρήστη");
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.passwordHash,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException("Λάθος κωδικός ή όνομα χρήστη");
        }

        const token = this.jwtService.sign(
            { id: user.id },
            { secret: process.env.JWT_SECRET },
        );

        return {
            token,
        };
    }

    async getUserProfile(request: Request): Promise<UserResponseDto> {
        const user = request.user as User;

        return {
            id: user.id,
            isAdmin: user.isAdmin,
            userName: user.userName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}
