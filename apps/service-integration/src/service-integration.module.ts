import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [`apps/service-integration/.env`],
        }),
        RmqModule,
    ],
    controllers: [],
    providers: [],
})
export class ServiceIntegrationModule {}
