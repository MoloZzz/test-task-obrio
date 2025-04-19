import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebhookIntegrationModule } from './webhook-integration/webhook-integration.module';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`apps/service-integration/.env`],
            validationSchema: Joi.object({
                RABBIT_MQ_URI: Joi.string().required(),
                RABBIT_MQ_NOTIFICATION_QUEUE: Joi.string().required(),
                RABBIT_MQ_INTEGRATION_QUEUE: Joi.string().required(),
                WEBHOOK_BASE_URL: Joi.string().required(),
            }),
        }),
        RmqModule,
        WebhookIntegrationModule,
    ],
    controllers: [],
    providers: [],
})
export class ServiceIntegrationModule {}
