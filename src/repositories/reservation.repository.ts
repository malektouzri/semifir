import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Reservation } from 'src/entities/reservation.entity';
import { CreateReservationDto } from 'src/modules/reservation/dto/createReservation.dto';

export class ReservationRepository {
    constructor(@InjectModel(Reservation.name) private readonly reservationModel: Model<Reservation>) {}

    async createReservation(createReservationDto: CreateReservationDto) {
        const newReservation = new this.reservationModel({
            date: createReservationDto.date,
            film: createReservationDto.filmId,
            client: createReservationDto.clientId
        });

        try {
            const createdReservation = await newReservation.save();
            return createdReservation;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getReservations(query: { from: number; limit: number }) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let Reservations: Reservation[];

        try {
            if (limit === 0) {
                Reservations = await this.reservationModel
                    .find()
                    .populate('date')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                Reservations = await this.reservationModel
                    .find()
                    .populate('date')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (Reservations.length > 0) {
                response = {
                    ok: true,
                    data: Reservations,
                    message: 'Get Reservations Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'Pas de Reservations!',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getReservationById(id: MongooseSchema.Types.ObjectId) {
        try {
            const Reservation = await this.reservationModel
                .findById(id)
                .populate('date')
                .exec();

            if (Reservation === null) {
                throw new BadRequestException('Aucune Reservation existe avec id: ' + id);
            }

            return Reservation;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async getReservationByClientId(clientId: MongooseSchema.Types.ObjectId) {
        try {
            const reservation = await this.reservationModel.find({ client: clientId }).exec();

            return reservation;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}