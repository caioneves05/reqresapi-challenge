import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator'


export class UserDto extends PartialType(CreateUserDto) {
    
    @IsNumber()
    id: number

    @IsString()
    @MinLength(3)
    first_name: string

    @IsString()
    @MinLength(3)
    last_name: string
    
    @IsString()
    @IsEmail()
    @IsNotEmpty({
        message: 'The password field must be filled in'
    })
    email: string
    
    @IsString()
    @MinLength(3)
    @IsNotEmpty({
        message: 'The password field must be filled in'
    })
    password: string
}
