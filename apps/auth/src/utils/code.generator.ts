import { Injectable } from "@nestjs/common";

@Injectable()
export class CodeGenerator {
    generateUserActivationCode(): string {
        return (Math.random() + 1).toString(36).substring(7);
    }
}