import { Injectable } from '@nestjs/common';
import { UserEntity } from '../common/entity/user.entity';
import { CreateUserDto } from '../common/dto/create-user.sto';

@Injectable()
export class UserService {
    async createUser(data: CreateUserDto) {
        console.log('User have not created, no database yet');
    }
}
