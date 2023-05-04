import { IsNotEmpty, IsString } from "class-validator";

export class addUserDTO {
    @IsNotEmpty()
    @IsString()
    avatar: string
}