import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UserController } from "./user.controller";
import { userProviders } from "./user.providers";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [...userProviders, UserService, JwtService],
    exports: [UserService],
})
export class UserModule {}
