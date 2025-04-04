import { Module } from '@nestjs/common';
import { ServiceNotificationController } from './service-notification.controller';
import { ServiceNotificationService } from './service-notification.service';

@Module({
  imports: [],
  controllers: [ServiceNotificationController],
  providers: [ServiceNotificationService],
})
export class ServiceNotificationModule {}
