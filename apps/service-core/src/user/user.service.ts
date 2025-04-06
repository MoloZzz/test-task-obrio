import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../common/entity/user.entity';
import { CreateUserDto } from '../common/dto/create-user.sto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { addDays } from 'date-fns';
import { IPushUserByName } from '@app/common';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @Inject('NOTIFICATION_CLIENT')
        private readonly clientNotification: ClientProxy,
    ) {}

    async createUser(data: CreateUserDto): Promise<UserEntity> {
        const existing = await this.userRepository.findOne({
            where: { name: data.name },
        });
        if (existing) {
            throw new ConflictException(`Користувач з ім'ям '${data.name}' вже існує`);
        }
        const userEntityObject: UserEntity = this.userRepository.create(data);
        const createdUser: UserEntity = await this.userRepository.save(userEntityObject);

        const dataToPushUser: IPushUserByName = {
            name: createdUser.name,
            timeToPush: addDays(createdUser.createdAt, 1).toISOString(),
        };

        this.clientNotification.emit<IPushUserByName>({ cmd: 'push-user-by-name' }, dataToPushUser);
        return createdUser;
    }
}
