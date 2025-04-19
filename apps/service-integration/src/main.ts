import { NestFactory } from '@nestjs/core';
import { ServiceIntegrationModule } from './service-integration.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(ServiceIntegrationModule);
    const configService = app.get<ConfigService>(ConfigService);
    const rmq = app.get<RmqService>(RmqService);
    app.connectMicroservice<MicroserviceOptions>(rmq.getOptions(configService.get<string>('RABBIT_MQ_INTEGRATION_QUEUE')));
    await app.startAllMicroservices(); //There is no own port, it is a microservice
}
bootstrap();
