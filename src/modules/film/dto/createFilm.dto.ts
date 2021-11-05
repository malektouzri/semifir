import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFilmDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}