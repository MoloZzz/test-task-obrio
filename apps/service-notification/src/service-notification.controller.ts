import { Controller, Get } from '@nestjs/common';
import { ServiceNotificationService } from './service-notification.service';

@Controller()
export class ServiceNotificationController {
    constructor(private readonly serviceNotificationService: ServiceNotificationService) {}

    @Get()
    getHello(): string {
        return this.serviceNotificationService.getHello();
    }
}
