import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { PushUserController } from './push-user.controller';

@Module({
    imports: [NotificationModule],
    controllers: [PushUserController],
})
export class EventsModule {}
