import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserStatus } from "@app/blogtivity-lib/constants/user-status.constant";
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Token Not Found');
        }

        try {
            const user = await this.authService.checkToken(token);
            if (user.status == UserStatus.BANNED) {
                throw new UnauthorizedException('This User got banned');
            }

            if (user.status == UserStatus.INACTIVE) {
                throw new UnauthorizedException('This user need to be activated first')
            }

            const payload = {
                id: user.id,
                username: user.username,
                status: user.status
            }

            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch (err) {
            throw err;
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
