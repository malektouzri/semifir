import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { FilmRepository } from 'src/repositories/film.repository';

import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateFilmDto } from './dto/createFilm.dto';

@Injectable()
export class FilmService {
    constructor(private readonly filmRepository: FilmRepository) {}

    async createFilm(createFilmDto: CreateFilmDto) {
        return await this.filmRepository.createFilm(createFilmDto);
    }

    async getFilms(getQueryDto: GetQueryDto) {
        return await this.filmRepository.getFilms(getQueryDto);
    }

    async getFilmById(id: MongooseSchema.Types.ObjectId) {
        return await this.filmRepository.getFilmById(id);
    }
}