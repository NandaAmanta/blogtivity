import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenGenerator {
    constructor(
        private jwtService: JwtService
    ) { }

    generateAccessToken(payload: object): string {
        return this.jwtService.sign(payload, {
            expiresIn: '1h',
            secret: process.env.ACCESS_TOKEN_SECRET
        });
    }

    generateRefreshToken(payload: object): string {
        return this.jwtService.sign(payload, {
            expiresIn: '1d',
            secret: process.env.REFRESH_TOKEN_SECRET
        });
    }
}