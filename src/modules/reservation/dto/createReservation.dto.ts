import { IsNotEmpty } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateReservationDto {
    @IsNotEmpty()
    clientId: MongooseSchema.Types.ObjectId;

    @IsNotEmpty()
    filmId: MongooseSchema.Types.ObjectId;

    @IsNotEmpty()
    date: string;
}