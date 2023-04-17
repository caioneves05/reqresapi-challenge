import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDcoument = HydratedDocument<User>

@Schema()
export class User {

    @Prop({required: true})
    id: string

    @Prop({required: true})
    first_name: string

    @Prop({required: true})
    last_name: string

    @Prop({required: true})
    email: string
    
    @Prop()

    avatar: string

}

export const UserSchema = SchemaFactory.createForClass(User)