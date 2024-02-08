import { Body, Controller, Post } from "@nestjs/common";
import { RegisterDto } from "../../dtos/register.dto";
import { User } from "@app/blogtivity-lib/models/user.model";
import { LoginDto } from "../../dtos/login.dto";
import { AuthenticationService } from "../../authentication.service";
import { TokenDto } from "../../dtos/token.dto";

@Controller('v1/auth')
export class AuthenticationController {
    constructor(
        private readonly authService: AuthenticationService
    ) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<User> {
        return await this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
        return await this.authService.login(loginDto);
    }
}