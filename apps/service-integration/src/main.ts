import { NestFactory } from '@nestjs/core';
import { ServiceIntegrationModule } from './service-integration.module';

async function bootstrap() {
    const app = await NestFactory.create(ServiceIntegrationModule);
    await app.listen(3000);
}
bootstrap();
