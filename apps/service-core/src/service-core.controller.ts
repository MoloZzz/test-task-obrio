import { Controller, Get } from '@nestjs/common';
import { ServiceCoreService } from './service-core.service';

@Controller()
export class ServiceCoreController {
    constructor(private readonly serviceCoreService: ServiceCoreService) {}

    @Get()
    getHello(): string {
        return this.serviceCoreService.getHello();
    }
}
