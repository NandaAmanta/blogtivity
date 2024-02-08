import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.setGlobalPrefix('api');
  await app.listen(3000).then(() => {
    console.log('Auth service is running on port 3000');
  });

  
}
bootstrap();
