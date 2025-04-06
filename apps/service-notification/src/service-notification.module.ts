import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { NotificationQueueModule } from './notification-queue/notification-queue.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`apps/service-notification/.env`],
        }),
        RmqModule,
        NotificationModule,
        NotificationQueueModule,
    ],
    controllers: [],
    providers: [],
})
export class ServiceNotificationModule {}
