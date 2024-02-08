import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenValidator {
    constructor(
        private jwtService: JwtService
    ) { }

    async validateAccessToken(token: string): Promise<any> {
        try {
            return await this.jwtService.verifyAsync(token, { secret: process.env.ACCESS_TOKEN_SECRET });
        } catch {
            return null;
        }
    }

    async validateRefreshToken(token: string): Promise<any> {
        try {
            return await this.jwtService.verifyAsync(token, { secret: process.env.REFRESH_TOKEN_SECRET });
        } catch {
            return null;
        }
    }
}