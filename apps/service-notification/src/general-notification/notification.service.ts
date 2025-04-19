import { IPushUserByName } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { BullNotificationQueueService } from '../bull-notification-queue/bull-notification-queue.service';
import { BullMqJob } from '../common/enums/bull-mq-job.enum';

@Injectable()
export class GeneralNotificationService {
    constructor(
        @Inject(BullNotificationQueueService)
        private readonly notificationQueueService: BullNotificationQueueService,
    ) {}

    async schedulePush(user: IPushUserByName) {
        const now = Date.now();
        const pushTime = new Date(user.timeToPush).getTime();
        const delayMs = Math.max(pushTime - now, 0); // захист від від’ємного значення
        await this.notificationQueueService.schedulePush(BullMqJob.NOTIFY_USER_BY_NAME, user.name, delayMs);
    }
}
