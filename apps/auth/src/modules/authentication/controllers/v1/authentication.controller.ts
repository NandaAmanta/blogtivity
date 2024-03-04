import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { RegisterDto } from "../../dtos/register.dto";
import { User } from "@app/blogtivity-lib/models/user.model";
import { LoginDto } from "../../dtos/login.dto";
import { AuthenticationService } from "../../authentication.service";
import { TokenDto } from "../../dtos/token.dto";
import { RefreshDto } from "../../dtos/refresh.dto";
import { ApiResponse } from "@app/blogtivity-lib/commons/api-response";
import { pseudoRandomBytes } from "crypto";

@Controller('v1/auth')
export class AuthenticationController {
    constructor(
        private readonly authService: AuthenticationService
    ) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<ApiResponse<User>> {
        const data = await this.authService.register(registerDto);
        return ApiResponse.success('Succes to register new account', 'SUCCESS_REGISTER', data);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<ApiResponse<TokenDto>> {
        const data = await this.authService.login(loginDto);
        return ApiResponse.success('Succes to login', 'SUCCESS_LOGIN', data);
    }

    @Post('refresh-token')
    async refreshToken(@Body() refreshDto: RefreshDto): Promise<ApiResponse<TokenDto>> {
        const data = await this.authService.refreshToken(refreshDto.token);
        return ApiResponse.success('Success to refresh token', 'SUCCESS_REFRESH_TOKEN', data);
    }

    @Get('activation')
    async activate(@Query('user_id') userId: number, @Query('code') code: string) {
        if (!userId || !code) {
            throw new BadRequestException('Invalid Activation Format');
        }
        return this.authService.activate(userId, code);
    }

    @Post('activation/:userId')
    async createNewActivationCode(@Param('userId') userId: number) {
        return this.createNewActivationCode(userId);
    }
}