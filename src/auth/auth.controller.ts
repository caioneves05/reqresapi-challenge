import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

interface SignInDTO {
    email: string
    password: string
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    signIn(@Body() signInDTO: SignInDTO) {
        try{
            return this.authService.signIn(signInDTO.email, signInDTO.password)
        }
        catch(err){
            throw new Error(err)
        }
    }
}