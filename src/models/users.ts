import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {

    @Prop()
    name: string

    @Prop()
    job: string

}

export const UserSchema = SchemaFactory.createForClass(User)