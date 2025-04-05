import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../common/dto/create-user.sto';

@Controller('user')
export class UserController {
    constructor(private readonly serviceUser: UserService){}

    @Post("")
    async createUser(@Body() data: CreateUserDto){
        return await this.serviceUser.createUser(data);
    }
}
