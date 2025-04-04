import { Module } from '@nestjs/common';
import { ServiceCoreController } from './service-core.controller';
import { ServiceCoreService } from './service-core.service';

@Module({
    imports: [],
    controllers: [ServiceCoreController],
    providers: [ServiceCoreService],
})
export class ServiceCoreModule {}
