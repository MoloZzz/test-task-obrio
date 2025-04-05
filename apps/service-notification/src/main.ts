import { NestFactory } from '@nestjs/core';
import { ServiceNotificationModule } from './service-notification.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const configApp = await NestFactory.create(ServiceNotificationModule);
    const configService = configApp.get(ConfigService);
    const rmq = configApp.get<RmqService>(RmqService);

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        ServiceNotificationModule,
        rmq.getOptions(configService.get<string>('RABBIT_MQ_NOTIFICATION_QUEUE')),
    );

    await app.listen(); //Не має власного порту, звертаємось лише через чергу rmq
}
bootstrap();
