import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationService } from '../general-notification/general-notification.service';
import { IPushUserByName } from '@app/common';

@Controller('push-user')
export class PushUserEventsController {
    constructor(@Inject(NotificationService) private readonly notificationService: NotificationService) {}

    @MessagePattern({ cmd: 'push-user-by-name' })
    async handleUserCreated(data: IPushUserByName) {
        console.log(`Received request`, data); // TODO: remove
        await this.notificationService.schedulePush(data);
    }
}
