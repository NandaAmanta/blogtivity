import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import configuration from "../configs/configuration";

@Injectable()
export class TokenGenerator {
    constructor(
        private jwtService: JwtService
    ) { }

    generateAccessToken(payload: object): string {
        return this.jwtService.sign(payload, {
            expiresIn: configuration().jwt.accessToken.expiresIn,
            secret: configuration().jwt.accessToken.secret
        });
    }

    generateRefreshToken(payload: object): string {
        return this.jwtService.sign(payload, {
            expiresIn: configuration().jwt.refreshToken.expiresIn,
            secret: configuration().jwt.refreshToken.secret
        });
    }
}