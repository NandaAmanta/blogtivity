import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import configuration from './configs/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.setGlobalPrefix('api');
  await app.listen(3000).then(() => {
    console.log('Auth service is running on port 3000');
  });

  const rabbitmqConf = configuration().rabbitmq;
  console.log(rabbitmqConf);
  const appMicro = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${rabbitmqConf.username}:${rabbitmqConf.password}@${rabbitmqConf.host}:${rabbitmqConf.port}`
        ],
        queue: rabbitmqConf.queue,
        queueOptions: {
          durable: false
        },
      },
    }
  );
  await appMicro.listen();

}
bootstrap();
