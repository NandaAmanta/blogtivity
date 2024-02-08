import { Module } from "@nestjs/common";
import { AuthenticationController } from "./controllers/v1/authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@app/blogtivity-lib/models/user.model";
import { TokenGenerator } from "../../utils/token.generator";
import { TokenValidator } from "../../utils/token.validator";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        AuthenticationService,
        TokenGenerator,
        TokenValidator
    ],
    exports: [TypeOrmModule],
    controllers: [
        AuthenticationController
    ]
})
export class AuthenticationModule { }