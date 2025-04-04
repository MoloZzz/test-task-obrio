import { Module } from '@nestjs/common';
import { ServiceIntegrationController } from './service-integration.controller';
import { ServiceIntegrationService } from './service-integration.service';

@Module({
    imports: [],
    controllers: [ServiceIntegrationController],
    providers: [ServiceIntegrationService],
})
export class ServiceIntegrationModule {}
