import {  MinLength, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {

   @IsString()
   @MinLength(3)
   @IsNotEmpty({
    message: 'The name field must be filled in.'
   }) 
    name: string

   @IsString()
   @MinLength(4)
   @IsNotEmpty({
    message: 'The job field must be filled in.'
   })
    job: string

}
