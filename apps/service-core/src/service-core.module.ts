import { Module } from '@nestjs/common';
import { ServiceCoreController } from './service-core.controller';
import { ServiceCoreService } from './service-core.service';
import { UserModule } from './user/user.module';

@Module({
    imports: [UserModule],
    controllers: [ServiceCoreController],
    providers: [ServiceCoreService],
})
export class ServiceCoreModule {}
