import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from "@nestjs/common";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { User } from "src/user/user.entity";

@Injectable()
export class IsAdminGuard extends JwtAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);

        const request = context.switchToHttp().getRequest();
        const user = request.user as User;

        if (!user.isAdmin) {
            throw new ForbiddenException("Access denied: You are not an admin");
        }

        return true;
    }
}
