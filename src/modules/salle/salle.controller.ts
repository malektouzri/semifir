import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateSalleDto } from './dto/createSalleDto.dto';
import { SalleService } from './salle.service';

@Controller('salle')
export class SalleController {
    constructor(private salleService: SalleService) {}

    @Post('/createSalle')
    async createSalle(@Body() createSalleDto: CreateSalleDto, @Res() res: any) {
        const newSalle = await this.salleService.createSalle(createSalleDto);
        return res.status(HttpStatus.OK).send(newSalle);
    }

    @Get('/getSalles')
    async getSalles(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const Salles: any = await this.salleService.getSalles(getQueryDto);
        return res.status(HttpStatus.OK).send(Salles);
    }

    @Get('/getSalleById/:id')
    async getSalleById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any) {
        const Salle: any = await this.salleService.getSalleById(id);
        return res.status(HttpStatus.OK).send(Salle);
    }
}