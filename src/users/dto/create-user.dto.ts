import {  MinLength, IsNotEmpty, IsString, IsEmail, IsNumber, IsOptional } from 'class-validator'

export class CreateUserDto {

   @IsNotEmpty({
    message: 'O Id filed must be filled in.'
    })
   @IsNumber()
   id: number


   @IsString()
   @MinLength(3)
   @IsNotEmpty({
    message: 'The name field must be filled in.'
   }) 
    first_name: string

   @IsString()
   @MinLength(3)
   @IsNotEmpty({
    message: 'The name field must be filled in.'
   }) 
   last_name: string

   @IsString()
   @MinLength(8, {
    message: 'The password must have at least 8 characters.'
   })
   @IsNotEmpty({
    message: 'The password field must be filled in'
   })
   password: string

   @IsString()
   @IsEmail()
   @IsNotEmpty({
    message: 'The email field must be filled in.'
   })
    email: string

   @IsOptional()
   @IsString()
    avatar: string

}
