import { NestFactory } from '@nestjs/core';
import { ServiceCoreModule } from './service-core.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RmqService } from '@app/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(ServiceCoreModule);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // then validator will strip validated object of any properties that do not have any decorators (ValidatorOptions)
            transform: true, // allow automatic transformation of incoming data (ValidationPipeOptions)
            transformOptions: {
                enableImplicitConversion: true, // enable transformation of data types (ClassTransformOptions)
            },
        }),
    );
    if (configService.get<string>('NODE_ENV') !== 'production') {
        const config = new DocumentBuilder()
            .setTitle('SERVICE-CORE API documentation')
            .setDescription('Development API documentation for obrio task service-core microservice')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('/api-docs', app, document);
    }
    const rmq = app.get<RmqService>(RmqService);
    app.connectMicroservice<MicroserviceOptions>(rmq.getOptions(configService.get<string>('RABBIT_MQ_CORE_QUEUE')));
    await app.listen(configService.get<number>('PORT'));
}
bootstrap();
