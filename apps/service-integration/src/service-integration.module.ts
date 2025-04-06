import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebhookIntegrationModule } from './webhook-integration/webhook-integration.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`apps/service-integration/.env`],
        }),
        RmqModule,
        WebhookIntegrationModule,
    ],
    controllers: [],
    providers: [],
})
export class ServiceIntegrationModule {}
