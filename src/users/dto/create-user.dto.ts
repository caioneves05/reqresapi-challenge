import {  MinLength, IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator'

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
   @IsEmail()
   @IsNotEmpty({
    message: 'The job field must be filled in.'
   })
    email: string

}
