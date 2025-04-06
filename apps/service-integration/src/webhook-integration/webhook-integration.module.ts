import { Module } from '@nestjs/common';
import { WebhookIntegrationController } from './webhook-integration.controller';
import { WebhookIntegrationService } from './webhook-integration.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                baseURL: configService.get<string>('WEBHOOK_BASE_URL'),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [WebhookIntegrationController],
    providers: [WebhookIntegrationService],
})
export class WebhookIntegrationModule {}
