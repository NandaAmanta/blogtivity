import { Module } from '@nestjs/common';
import { AuthenticationController } from './modules/authentication/controllers/v1/authentication.controller';
import { AuthenticationService } from './modules/authentication/authentication.service';
import { TokenGenerator } from './modules/authentication/utils/token.generator';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/blogtivity-lib/models/user.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [User],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    })
  ],
  controllers: [
    AuthenticationController
  ],
  providers: [
    TokenGenerator,
    AuthenticationService,
  ],
})
export class AuthModule { }
