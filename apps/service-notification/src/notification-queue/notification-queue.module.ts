import { Module } from '@nestjs/common';
import { NotificationQueueService } from './notification-queue.service';
import { BullModule } from '@nestjs/bull';
import { NotificationQueueProcessor } from './notification-queue.processor';
import { BullMqQueue } from '../common/enums/bull-mq-queue.enum';
import { RmqModule } from '@app/common';

@Module({
    imports: [
        BullModule.registerQueue({
            name: BullMqQueue.BULL_MQ_NOTIFY_USER_QUEUE,
        }),
        RmqModule.register({
            name: 'INTEGRATION_CLIENT',
            queueName: 'RABBIT_MQ_INTEGRATION_QUEUE',
        }),
    ],
    providers: [NotificationQueueProcessor, NotificationQueueService],
    exports: [NotificationQueueService],
})
export class NotificationQueueModule {}
