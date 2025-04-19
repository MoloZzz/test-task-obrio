import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { RmqModule } from '@app/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        RmqModule.register({
            name: 'NOTIFICATION_CLIENT',
            queueName: 'RABBIT_MQ_NOTIFICATION_QUEUE',
        }),
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
