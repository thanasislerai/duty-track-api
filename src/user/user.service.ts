import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @Inject("USER_REPOSITORY")
        private readonly userRepository: Repository<User>,
    ) {}

    async findById(id: number) {
        return await this.userRepository.findOne({ where: { id } });
    }
}
