import { Module } from '@nestjs/common';
import { GeneralNotificationService } from './notification.service';
import { BullNotificationQueueModule } from '../bull-notification-queue/bull-notification-queue.module';

@Module({
    imports: [BullNotificationQueueModule],
    providers: [GeneralNotificationService],
    exports: [GeneralNotificationService],
})
export class GeneralNotificationModule {}
