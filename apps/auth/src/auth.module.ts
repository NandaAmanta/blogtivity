import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/blogtivity-lib/models/user.model';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { GuardModule } from './modules/guard/guard.module';
import { TokenGenerator } from './utils/token.generator';
import { TokenValidator } from './utils/token.validator';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [User]
    }),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
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
