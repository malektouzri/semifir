import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { ReservationRepository } from 'src/repositories/reservation.repository';
import { CreateReservationDto } from './dto/createReservation.dto';

@Injectable()
export class ReservationService {
    constructor(
        private reservationRepository: ReservationRepository,
    ) {}

    async createReservation(createReservationDto: CreateReservationDto) {
        const createdReservation = await this.reservationRepository.createReservation(createReservationDto);
        return createdReservation;
    }

    async getReservations(query: { from: number; limit: number }) {
        const reservations = await this.reservationRepository.getReservations(query);
        return reservations;
    }

    async getReservationById(reservationId: MongooseSchema.Types.ObjectId) {
        const reservation: any = await this.reservationRepository.getReservationById(reservationId);
        return reservation;
    }

    async getReservationByClientId(clientId: MongooseSchema.Types.ObjectId) {
        const reservations: any = await this.reservationRepository.getReservationByClientId(clientId);
        return reservations;
    }
}