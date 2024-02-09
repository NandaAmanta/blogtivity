import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/blogtivity-lib/models/user.model';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { GuardModule } from './modules/guard/guard.module';
import { TokenGenerator } from './utils/token.generator';
import { TokenValidator } from './utils/token.validator';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [`${process.cwd()}/apps/auth/.env`, '.env']
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: configuration().database.type as 'mysql' | 'mariadb',
        host: configuration().database.host,
        port: configuration().database.port,
        username: configuration().database.username,
        password: configuration().database.password,
        database: configuration().database.database,
        entities: [User]
      })
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
