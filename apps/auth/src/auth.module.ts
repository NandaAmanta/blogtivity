import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/blogtivity-lib/models/user.model';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { GuardModule } from './modules/guard/guard.module';
import { TokenGenerator } from './utils/token.generator';
import { TokenValidator } from './utils/token.validator';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configs/configuration';
import typeorm from './configs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, typeorm],
      envFilePath: [`${process.cwd()}/apps/auth/.env`, '.env']
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    JwtModule.register({
      global: true
    }),
    AuthenticationModule,
    GuardModule
  ],
  providers: [
    TokenGenerator,
    TokenValidator
  ],
})
export class AuthModule { }
