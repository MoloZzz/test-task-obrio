import { Controller, Get } from '@nestjs/common';
import { ServiceIntegrationService } from './service-integration.service';

@Controller()
export class ServiceIntegrationController {
    constructor(private readonly serviceIntegrationService: ServiceIntegrationService) {}

    @Get()
    getHello(): string {
        return this.serviceIntegrationService.getHello();
    }
}
