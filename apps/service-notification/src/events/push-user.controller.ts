import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationService } from '../notification/notification.service';
import { IPushUserByName } from '@app/common';

/** Слухаємо події з RMQ (інші сервіси) */
@Controller('push-user')
export class PushUserController {
    constructor(@Inject(NotificationService) private readonly notificationService: NotificationService) {}

    @MessagePattern({ cmd: 'push-user-by-name' })
    async handleUserCreated(data: IPushUserByName) {
        console.log(`Received request`, data); // TODO: remove
        await this.notificationService.schedulePush(data);
    }
}
