import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateSalleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    filmId: MongooseSchema.Types.ObjectId;

    @IsOptional()
    id: MongooseSchema.Types.ObjectId;
}