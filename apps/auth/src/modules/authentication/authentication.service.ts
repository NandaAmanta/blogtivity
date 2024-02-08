import { BadRequestException, Injectable } from "@nestjs/common";
import { RegisterDto } from "./dtos/register.dto";
import { User } from "@app/blogtivity-lib/models/user.model";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from "./dtos/login.dto";
import { UserStatus } from "@app/blogtivity-lib/constants/user-status.constant";
import { TokenGenerator } from "./utils/token.generator";
import { TokenDto } from "./dtos/token.dto";

@Injectable()
export class AuthenticationService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private tokenGenerator: TokenGenerator
    ) { }

    async register(registerDto: RegisterDto): Promise<User> {
        await this._checkUsernameAndEmailAvailbility(registerDto.username, registerDto.email);
        const user = new User();
        user.name = registerDto.name;
        user.email = registerDto.email;
        await user.setHashedPassword(registerDto.password);
        return this.usersRepository.save(user);
    }

    async login(loginDto: LoginDto): Promise<TokenDto> {
        const user = await this._checkCredential(loginDto.usernameOrEmail, loginDto.password);
        const payloadToken = {
            id: user.id,
            username: user.username,
            email: user.email
        };
        const accessToken = this.tokenGenerator.generateAccessToken(payloadToken);
        const refreshToken = this.tokenGenerator.generateRefreshToken(payloadToken);
        return new TokenDto(accessToken, refreshToken);
    }

    private async _checkCredential(usernameOrEmail: string, password: string): Promise<User> {
        const user = await this.usersRepository.createQueryBuilder('user')
            .where('user.username = :username', {
                username: usernameOrEmail
            })
            .orWhere('user.email = :email', {
                email: usernameOrEmail
            })
            .getOne();

        if (!user || !(await user.checkPassword(password))) {
            throw new BadRequestException('username or password wrong');
        }

        if (user.status == UserStatus.BANNED) {
            throw new BadRequestException('user is banned');
        }

        if (user.status == UserStatus.INACTIVE) {
            throw new BadRequestException('user is inactive, you can activate your status by validate your email address');
        }

        return user;
    }

    private async _checkUsernameAndEmailAvailbility(username: string, email): Promise<void> {

        const userByUsername = await this.usersRepository.createQueryBuilder('user')
            .where('user.username = :username', {
                username: username
            })
            .getExists();

        if (userByUsername) {
            throw new BadRequestException('username is not available');
        }

        const userByEmail = await this.usersRepository.createQueryBuilder('user')
            .where('user.email = :email', {
                email: email
            })
            .getExists();

        if (userByEmail) {
            throw new BadRequestException('email is not available');
        }
    }
}