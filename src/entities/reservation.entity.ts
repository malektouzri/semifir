import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Client } from './client.entity';
import { Film } from './film.entity';

@Schema()
export class Reservation extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Client.name })
    client: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Film.name })
    film: MongooseSchema.Types.ObjectId;

    @Prop({ type: String })
    date: string;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);