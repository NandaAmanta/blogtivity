import { Module } from '@nestjs/common';
import { AuthenticationController } from './modules/authentication/controllers/v1/authentication.controller';
import { AuthenticationService } from './modules/authentication/authentication.service';
import { TokenGenerator } from './modules/authentication/utils/token.generator';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/blogtivity-lib/models/user.model';
import { AuthenticationModule } from './modules/authentication/authentication.module';

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
    AuthenticationModule
  ],
  providers: [],
})
export class AuthModule { }
