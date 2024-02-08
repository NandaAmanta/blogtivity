import { Module } from "@nestjs/common";
import { GuardController } from "./controllers/v1/guard.controller";
import { GuardService } from "./guard.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@app/blogtivity-lib/models/user.model";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        GuardService
    ],
    exports: [],
    controllers: [
        GuardController
    ]
})
export class GuardModule { }
