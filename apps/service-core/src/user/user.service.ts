import { Injectable } from '@nestjs/common';
import { UserEntity } from '../common/entity/user.entity';
import { CreateUserDto } from '../common/dto/create-user.sto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(data: CreateUserDto): Promise<UserEntity> {
        const userEntityObject = this.userRepository.create(data); // Краще не створювати відразу з dto
        const createdUser = await this.userRepository.save(userEntityObject); // А чітко розділяти, щоб бд працювала тільки з ентіті
        // TODO: Передаємо інфу в service-notification щоб сповістити юзера через 24 години
        return createdUser;
    }
}
