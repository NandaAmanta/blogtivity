import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configs/configuration";
import typeorm from "./configs/typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ArticleModule } from "./modules/article/article.module";
import { CommentModule } from "./modules/comment/comment,module";

const rabbitmqConf = configuration().rabbitmq;
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
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${rabbitmqConf.username}:${rabbitmqConf.password}@${rabbitmqConf.host}:${rabbitmqConf.port}`
        ],
          queue: 'auth_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    ArticleModule,
    CommentModule
  ],
  providers: [
  ],
})
export class AppModule { }