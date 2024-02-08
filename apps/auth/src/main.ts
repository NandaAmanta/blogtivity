import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.setGlobalPrefix('api');
  await app.listen(3000).then(() => {
    console.log('Auth service is running on port 3000');
  });

  const appMicro = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://nanda:nanda0011@192.168.56.109:5672'],
        queue: 'auths_queue',
        queueOptions: {
          durable: false
        },
      },
    }
  );
  await appMicro.listen();

}
bootstrap();
