import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateFilmDto } from './dto/createFilm.dto';
import { FilmService } from './film.service';

@Controller('film')
export class FilmController {
    constructor(private filmService: FilmService) {}

    @Post('/createFilm')
    async createFilm(@Body() createFilmDto: CreateFilmDto, @Res() res: any) {
        const newFilm = await this.filmService.createFilm(createFilmDto);
        return res.status(HttpStatus.OK).send(newFilm);
    }

    @Get('/getFilms')
    async getFilms(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const Films: any = await this.filmService.getFilms(getQueryDto);
        return res.status(HttpStatus.OK).send(Films);
    }

    @Get('/getFilmById/:id')
    async getFilmById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any) {
        const Film: any = await this.filmService.getFilmById(id);
        return res.status(HttpStatus.OK).send(Film);
    }
}