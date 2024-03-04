import { BadRequestException, Injectable } from "@nestjs/common";
import { RegisterDto } from "./dtos/register.dto";
import { User } from "@app/blogtivity-lib/models/user.model";
import { UserActivationCode } from "@app/blogtivity-lib/models/user-activation-code.model";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from "./dtos/login.dto";
import { UserStatus } from "@app/blogtivity-lib/constants/user-status.constant";
import { TokenGenerator } from "../../utils/token.generator";
import { TokenDto } from "./dtos/token.dto";
import { TokenValidator } from "../../utils/token.validator";
import { CodeGenerator } from "../../utils/code.generator";

@Injectable()
export class AuthenticationService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(UserActivationCode)
        private userActivationCodeRepository: Repository<UserActivationCode>,
        private tokenGenerator: TokenGenerator,
        private tokenValidator: TokenValidator,
        private codeGenerator: CodeGenerator
    ) { }

    async register(registerDto: RegisterDto): Promise<User> {
        await this._checkUsernameAndEmailAvailbility(registerDto.username, registerDto.email);

        let user = new User();
        user.name = registerDto.name;
        user.email = registerDto.email;
        await user.setHashedPassword(registerDto.password);
        user = await this.usersRepository.save(user);
        
        await this.createNewActivationCode(user.id);
        return user;
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

    async refreshToken(token: string): Promise<TokenDto> {
        const payload = await this.tokenValidator.validateRefreshToken(token);
        const user = await this.usersRepository.findOne(payload.id);
        if (!user) {
            throw new BadRequestException('user not found');
        }
        const payloadToken = {
            id: user.id,
            username: user.username,
            email: user.email
        };
        const accessToken = this.tokenGenerator.generateAccessToken(payloadToken);
        const refreshToken = this.tokenGenerator.generateRefreshToken(payloadToken);
        return new TokenDto(accessToken, refreshToken);
    }

    async activate(userId: number, code: String) {
        const activationCode = await this._findValidActivationCodeByUserIdAndCode(userId, code);
        if (!activationCode) {
            throw new BadRequestException('Invalid Activation Code');
        }
        return await this._activateUserById(userId, activationCode);
    }

    async createNewActivationCode(userId: number): Promise<UserActivationCode> {
        this._expiredAllActivationCodeByUserId(userId);
        const newActivationCode = new UserActivationCode();
        newActivationCode.user_id = userId;
        newActivationCode.code = this.codeGenerator.generateUserActivationCode();
        return newActivationCode;
    }

    private async _expiredAllActivationCodeByUserId(userId: number) {
        await this.userActivationCodeRepository.update({ user_id: userId }, { expiredAt: new Date() });
    }

    private async _activateUserById(userId: number, activationCode: UserActivationCode): Promise<User> {
        let user = await this.usersRepository.findOneBy({ id: userId });
        user.status = UserStatus.ACTIVE;
        activationCode.hasUsed = true;
        await this.userActivationCodeRepository.save(activationCode);
        return await this.usersRepository.save(user);
    }

    private async _findValidActivationCodeByUserIdAndCode(userId: Number, code: String): Promise<UserActivationCode | null> {
        return await this.userActivationCodeRepository.createQueryBuilder('userCode')
            .where('userCode.code = :code', { code: code })
            .where('userCode.user_id = :userId', { userId })
            .where('userCode.has_used = :hasUsed ', { hasUsed: false })
            .where('userCode.expired_at >= :now', { now: new Date() })
            .getOne()
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