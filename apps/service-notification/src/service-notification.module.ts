import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { NotificationQueueModule } from './notification-queue/notification-queue.module';
import { EventsModule } from './events/events.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`apps/service-notification/.env`],
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
