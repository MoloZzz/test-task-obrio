import { Module } from '@nestjs/common';
import { NotificationQueueService } from './notification-queue.service';
import { BullModule } from '@nestjs/bull';
import { NotificationQueueProcessor } from './notification-queue.processor';
import { BullMqQueue } from '../common/enums/bull-mq-queue.enum';

@Module({
    imports: [ 
        BullModule.registerQueue({
            name: BullMqQueue.BULL_MQ_NOTIFY_USER_QUEUE,
        }),
    ],
    providers: [
        NotificationQueueProcessor, 
        NotificationQueueService,
    ],
    exports: [NotificationQueueService],
})
export class NotificationQueueModule {}
