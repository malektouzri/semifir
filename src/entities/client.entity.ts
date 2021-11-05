import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Client extends Document {
    @Prop({ required: true, unique: true, message: 'Name must be unique' })
    name: string;

    @Prop({ required: true })
    contactNumber: string;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: Date.now })
    createdAt: Date;
}
export const ClientSchema = SchemaFactory.createForClass(Client);
