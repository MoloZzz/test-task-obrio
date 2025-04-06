import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationQueueModule } from '../notification-queue/notification-queue.module';

@Module({
    imports: [NotificationQueueModule],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationModule {}
