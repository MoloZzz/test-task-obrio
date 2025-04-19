import { Module } from '@nestjs/common';
import { GeneralNotificationModule } from '../general-notification/general-notification.module';
import { PushUserEventsController } from './push-user-events.controller';

@Module({
    imports: [GeneralNotificationModule],
    controllers: [PushUserEventsController],
})
export class RMQEventsListenerModule {}
