import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags()
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiOkResponse({
        content: {
            "text/plain": {
                schema: { type: "string" },
            },
        },
    })
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
