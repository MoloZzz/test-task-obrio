import { IPushUserByName } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { NotificationQueueService } from '../notification-queue/notification-queue.service';
import { BullMqJob } from '../common/enums/bull-mq-job.enum';

@Injectable()
export class NotificationService {
    constructor(
        @Inject(NotificationQueueService)
        private readonly notificationQueueService: NotificationQueueService
    ) {} 

    async schedulePush(user: IPushUserByName) {
        const now = Date.now();
        const pushTime = new Date(user.timeToPush).getTime();
        const delayMs = Math.max(pushTime - now, 0); // захист від від’ємного значення
        await this.notificationQueueService.schedulePush(BullMqJob.NOTIFY_USER_BY_NAME, user.name, delayMs);
    }
}
