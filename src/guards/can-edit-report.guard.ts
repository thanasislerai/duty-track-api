import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { Report } from "src/report/report.entity";

@Injectable()
export class CanEditReportGuard extends JwtAuthGuard implements CanActivate {
    constructor(
        @Inject("REPORT_REPOSITORY")
        private readonly reportRepository: Repository<Report>,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);
        const request = context.switchToHttp().getRequest();
        const user = request.user as User;
        const { reportId } = request.params;
        const report = await this.reportRepository.findOne({
            where: { id: reportId },
            relations: ["user"],
        });

        if (!report) {
            throw new NotFoundException(`Report with id ${reportId} not found`);
        }

        return user.isAdmin || user.id === report.user.id;
    }
}
