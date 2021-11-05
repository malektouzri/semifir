import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from 'src/entities/film.entity';
import { FilmRepository } from 'src/repositories/film.repository';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
    ],
    controllers: [FilmController],
    providers: [FilmService, FilmRepository],
    exports: [FilmService, FilmRepository],
})
export class FilmModule {}