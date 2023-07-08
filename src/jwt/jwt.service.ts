import { Injectable } from "@nestjs/common";
import JWT from 'jsonwebtoken'
import 'dotenv/config'
import { Request, Response } from "express";

@Injectable()
export class JwtService {

    validationKey(keySecret: string): string | Error {
        if(!keySecret) {
            throw new Error('Secret Key is not defined!')
        }
        return keySecret
    }

    createToken(email: string, id: string): string | Error {

        const key = process.env.PHRASE_JWT

        const payload = {
            email: email,
            id: id
        }
        const token = JWT.sign(payload, this.validationKey(key))
        
        return token
    }

    async validateSession(req: Request, res: Response) {
        const headerAut = await req.headers.authorization

        if(!headerAut) {
            throw new Error('Token is not provided')
        }

        const token = headerAut.split(' ')[1]

        try {
            const encrypt = JWT.verify(token, this.validationKey, (err, decode) => {
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
    }
}