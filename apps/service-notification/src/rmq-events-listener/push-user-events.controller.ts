import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GeneralNotificationService } from '../general-notification/general-notification.service';
import { IPushUserByName } from '@app/common';

@Controller('push-user')
export class PushUserEventsController {
    constructor(@Inject(GeneralNotificationService) private readonly notificationService: GeneralNotificationService) {}

    @MessagePattern({ cmd: 'push-user-by-name' })
    async handleUserCreated(data: IPushUserByName) {
        console.log(`Received request`, data); // TODO: remove
        await this.notificationService.schedulePush(data);
    }
}
