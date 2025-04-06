import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { BullMqQueue } from '../common/enums/bull-mq-queue.enum';
import { BullMqJob } from '../common/enums/bull-mq-job.enum';

/** Обробник черги push-нотифікацій */
@Processor(BullMqQueue.BULL_MQ_NOTIFY_USER_QUEUE)
export class NotificationQueueProcessor {

  @Process(BullMqJob.NOTIFY_USER_BY_NAME)
  async notifyUserByName(job: Job<{name:string}>): Promise<void> {
    switch (job.name) {
        case BullMqJob.NOTIFY_USER_BY_NAME: {
            const { name } = job.data;
            console.log(`Processing push job: [${job.name}] -> push to user '${name}'`);
            // TODO: Відправка push + публікація події в RabbitMQ -> service-integration
        }
        default: {
          console.log(`Unknown job name: ${job.name}`);
        }
      }
  }
}
