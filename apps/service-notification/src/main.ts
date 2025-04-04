import { NestFactory } from '@nestjs/core';
import { ServiceNotificationModule } from './service-notification.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceNotificationModule);
  await app.listen(3000);
}
bootstrap();
