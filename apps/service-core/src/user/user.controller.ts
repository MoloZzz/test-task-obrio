import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../common/dtos/create-user.sto';
import { UserEntity } from '../common/entities/user.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(private readonly serviceUser: UserService) {}

    @Post()
    @ApiOperation({ summary: 'Create user, basic CRUD' })
    async createUser(@Body() data: CreateUserDto): Promise<UserEntity> {
        return this.serviceUser.createUser(data);
    }
}
