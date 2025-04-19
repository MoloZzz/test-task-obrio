import { Module } from '@nestjs/common';
import { NotificationModule } from '../general-notification/notification.module';
import { PushUserEventsController } from './push-user-events.controller';

@Module({
    imports: [NotificationModule],
    controllers: [PushUserEventsController],
})
export class RMQEventsListenerModule {}
