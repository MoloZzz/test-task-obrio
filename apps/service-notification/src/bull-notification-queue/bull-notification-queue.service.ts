import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { BullMqQueue } from '../common/enums/bull-mq-queue.enum';
import { Queue } from 'bull';

/** BullMQ (only for add into queue)*/
@Injectable()
export class BullNotificationQueueService {
    constructor(@InjectQueue(BullMqQueue.BULL_MQ_NOTIFY_USER_QUEUE) private readonly queue: Queue) {}

    async schedulePush(jobName: string, userName: string, delayMs: number = 0) {
        const job = await this.queue.add(jobName, { name: userName }, { delay: delayMs, attempts: 3 });
        console.log(`Job ${job.id} scheduled for user '${userName}' in ${delayMs}ms`);
    }

    async checkQueue() {
        const jobCounts = await this.queue.getJobCounts();
        console.log('Queue status:', jobCounts);
    }
}
