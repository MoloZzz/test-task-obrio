import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../common/dto/create-user.sto';
import { UserEntity } from '../common/entity/user.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(private readonly serviceUser: UserService) {}

    @Post('')
    @ApiOperation({ summary: 'Create user' })
    async createUser(@Body() data: CreateUserDto): Promise<UserEntity> {
        return await this.serviceUser.createUser(data);
    }
}
