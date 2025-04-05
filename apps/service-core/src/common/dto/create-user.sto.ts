import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;
}