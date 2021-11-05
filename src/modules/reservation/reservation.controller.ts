import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { CreateReservationDto } from './dto/createReservation.dto';
import { GetReservationsDto } from './dto/getReservations.dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
    constructor(private reservationService: ReservationService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/createReservation')
    async createReservation(@Body() createReservationDto: CreateReservationDto, @Res() res: any) {
        const newReservation: any = await this.reservationService.createReservation(createReservationDto);
        return res.status(HttpStatus.OK).send(newReservation);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/getReservationById/:id')
    async getReservationById(@Param('id') id: MongooseSchema.Types.ObjectId, @Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const storage: any = await this.reservationService.getReservationById(id);
        return res.status(HttpStatus.OK).send(storage);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/getReservations')
    async getReservations(@Query() getQueryDto: GetReservationsDto, @Res() res: any) {
        const reservations: any = await this.reservationService.getReservations(getQueryDto);
        return res.status(HttpStatus.OK).send(reservations);
    }
}