import { Controller } from '@nestjs/common';
import { WebhookIntegrationService } from './webhook-integration.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('webhook-integration')
export class WebhookIntegrationController {
    constructor(private readonly service: WebhookIntegrationService) {}

    @MessagePattern({ cmd: 'generate-url' })
    async generateUrl(data: { name: string }) {
        return this.service.generateUrl(data.name);
    }
}
