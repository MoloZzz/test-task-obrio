import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { BullMqQueue } from '../common/enums/bull-mq-queue.enum';
import { BullMqJob } from '../common/enums/bull-mq-job.enum';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

/** BullMQ reader */
@Processor(BullMqQueue.BULL_MQ_NOTIFY_USER_QUEUE)
export class BullNotificationQueueProcessor {
    constructor(@Inject('INTEGRATION_CLIENT') private readonly clientIntegration: ClientProxy) {}

    @Process(BullMqJob.NOTIFY_USER_BY_NAME)
    async notifyUserByName(job: Job<{ name: string }>): Promise<void> {
        switch (job.name) {
            case BullMqJob.NOTIFY_USER_BY_NAME: {
                const { name } = job.data;
                console.log(`Processing push job: [${job.name}] -> push to user '${name}'`);

                const notifyWebHook = await lastValueFrom(this.clientIntegration.send({ cmd: 'generate-url' }, { name }));
                console.log('User already pushed: ', notifyWebHook); // Бажано винести відповіді в інший модуль і повідомляти service-core
            }
            default: {
                console.log(`Unknown job name: ${job.name}`);
            }
        }
    }
}
