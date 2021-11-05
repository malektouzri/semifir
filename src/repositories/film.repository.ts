import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Film } from 'src/entities/film.entity';
import { CreateFilmDto } from 'src/modules/film/dto/createFilm.dto';

import { GetQueryDto } from '../dto/getQueryDto';
import { ResponseDto } from '../dto/response.dto';


export class FilmRepository {
    constructor(
        @InjectModel(Film.name)
        private readonly FilmModel: Model<Film>,
    ) {}

    async createFilm(createFilmDto: CreateFilmDto) {
        const FilmExists: any = await this.getFilmByName(createFilmDto.title);

        if (!FilmExists.ok) {
            const newFilm = new this.FilmModel({
                title: createFilmDto.title,
                description: createFilmDto.description,
            });

            try {
                const createdFilm = await newFilm.save();
                return createdFilm;
            } catch (error) {
                throw new InternalServerErrorException('Erreur de connexion à la BDD', error);
            }
        } else {
            throw new ConflictException('Le Film existe déjà!');
        }
    }

    async getFilms(query: GetQueryDto) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let Films: Film[];

        try {
            if (limit === 0) {
                Films = await this.FilmModel
                    .find()
                    .populate('title')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                Films = await this.FilmModel
                    .find()
                    .populate('title')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response: ResponseDto;

            if (Films.length > 0) {
                response = {
                    ok: true,
                    data: Films,
                    message: 'Get Films Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'Pas de Films!',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException('Erreur interne, impossible de consulter les Films', error);
        }
    }

    async getFilmById(id: MongooseSchema.Types.ObjectId) {
        try {
            const Film = await this.FilmModel.findById(id).exec();

            return Film;
        } catch (error) {
            throw new InternalServerErrorException('Pas de Film enregistré avec un id:' + id, error);
        }
    }

    async getFilmByName(name: string) {
        try {
            const Film = await this.FilmModel.find({ name });
            return Film;
        } catch (error) {
            throw new InternalServerErrorException('Erreur interne, impossible de consulter les Films', error);
        }
    }
}