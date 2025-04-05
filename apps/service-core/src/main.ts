import { NestFactory } from '@nestjs/core';
import { ServiceCoreModule } from './service-core.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(ServiceCoreModule);
    const configService = app.get(ConfigService);
    if (configService.get<string>('NODE_ENV') !== 'production') {
        const config = new DocumentBuilder()
            .setTitle('SERVICE-CORE API documentation')
            .setDescription('Development API documentation for nashdim service-core microservice')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/v1/core/api-docs', app, document);
    }
    await app.listen(configService.get<number>('PORT'));
}
bootstrap();
