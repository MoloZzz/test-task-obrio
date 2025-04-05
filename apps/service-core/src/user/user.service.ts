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
        return this.userRepository.create(data);
    }
}
