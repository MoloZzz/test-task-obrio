import { Module } from '@nestjs/common';
import { BullNotificationQueueService } from './bull-notification-queue.service';
import { BullModule } from '@nestjs/bull';
import { BullNotificationQueueProcessor } from './bull-notification-queue.processor';
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
    providers: [BullNotificationQueueProcessor, BullNotificationQueueService],
    exports: [BullNotificationQueueService],
})
export class BullNotificationQueueModule {}
