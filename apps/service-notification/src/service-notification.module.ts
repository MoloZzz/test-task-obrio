import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { NotificationQueueModule } from './notification-queue/notification-queue.module';
import { EventsModule } from './events/events.module';
import { BullModule } from '@nestjs/bullmq';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`apps/service-notification/.env`],
            validationSchema: Joi.object({        
                RABBIT_MQ_URI: Joi.string().required(),
                RABBIT_MQ_NOTIFICATION_QUEUE: Joi.string().required(),
                REDIS_HOST: Joi.string().required(),
                REDIS_PORT: Joi.number().required(),
            }),
        }),
        BullModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                connection: {
                    host: configService.get<string>('REDIS_HOST'),
                    port: configService.get<number>('REDIS_PORT'),
                },
            }),
            inject: [ConfigService],
        }),
        RmqModule,
        NotificationModule,
        NotificationQueueModule,
        EventsModule,
    ],
    controllers: [],
    providers: [],
})
export class ServiceNotificationModule {}
