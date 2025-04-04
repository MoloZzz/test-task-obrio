import { NestFactory } from '@nestjs/core';
import { ServiceCoreModule } from './service-core.module';

async function bootstrap() {
    const app = await NestFactory.create(ServiceCoreModule);
    await app.listen(3000);
}
bootstrap();
