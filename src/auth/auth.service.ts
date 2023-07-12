import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";

import jwt from "jsonwebtoken";
import * as CryptoJS from 'crypto-js'
import 'dotenv/config'

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private jwtService: JwtService){}

    validationKey(keySecret: string): string | Error {
        if(!keySecret) {
            throw new Error('Secret Key is not defined!')
        }
        return keySecret
    }

    async signIn(email: string, password: string): Promise<any> {
        const user = await this.userService.findUserDb(email, password)
        const passwrodHashed = CryptoJS.SHA256(user.password).toString(CryptoJS.enc.Hex)


        if(user?.password !== passwrodHashed) {
            throw new UnauthorizedException();
        }
        const payload = {id: user.id, userName: user.first_name}
        return {
            acess_token: await this.jwtService.signAsync(payload)
        }     

    }
    /*
    async validateSession(req: Request, res: Response) {
        const headerAut = await req.headers.authorization

        if(!headerAut) {
            throw new Error('Token is not provided')
        }

        const token = headerAut.split(' ')[1]

        try {
            const encrypt = jwt.verify(token, this.validationKey, (err, decode) => {
                if(err) {
                    throw new Error('Invalid Token')
                }
                const idUser = decode.id
                const emailUser = decode.email
                const bodyDecode = {
                    email: emailUser,
                    id: idUser
                }

                return bodyDecode;
            })
            return encrypt
        }
        catch (err) {
            return err
        }
    } */
}