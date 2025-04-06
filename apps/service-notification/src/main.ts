import { NestFactory } from '@nestjs/core';
import { ServiceNotificationModule } from './service-notification.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(ServiceNotificationModule);
    const configService = app.get<ConfigService>(ConfigService);
    const rmq = app.get<RmqService>(RmqService);
    app.connectMicroservice<MicroserviceOptions>(rmq.getOptions(configService.get<string>('RABBIT_MQ_NOTIFICATION_QUEUE')),);
    await app.startAllMicroservices(); //Не має власного порту, звертаємось лише через чергу rmq
}
bootstrap();
