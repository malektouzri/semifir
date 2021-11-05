import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Film } from './film.entity';

@Schema()
export class Salle extends Document {
    @Prop({ required: true, unique: true, message: 'Name must be unique' })
    name: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Film.name })
    film: any;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: Date.now })
    createdAt: Date;

}
export const SalleSchema = SchemaFactory.createForClass(Salle);
