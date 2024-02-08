import { Module } from "@nestjs/common";
import { GuardController } from "./controllers/v1/guard.controller";

@Module({
    imports: [],
    providers: [],
    exports: [],
    controllers: [
        GuardController
    ]
})
export class GuardModule { }
