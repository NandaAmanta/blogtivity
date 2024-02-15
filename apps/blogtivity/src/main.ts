import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './configs/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(configuration().app.port).then(() => {
    console.log('Server is running on http://localhost:' + configuration().app.port);
  });
}
bootstrap();
