import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from 'src/entities/reservation.entity';
import { ReservationRepository } from 'src/repositories/reservation.repository';
import { ClientModule } from '../client/client.module';
import { FilmModule } from '../film/film.module';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
    imports: [ClientModule, FilmModule, MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }])],
    controllers: [ReservationController],
    providers: [ReservationService, ReservationRepository],
    exports: [ReservationService, ReservationRepository],
})
export class ReservationModule {}