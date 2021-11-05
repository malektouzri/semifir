import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { Salle } from 'src/entities/salle.entity';
import { CreateSalleDto } from 'src/modules/salle/dto/createSalleDto.dto';
import { UpdateSalleDto } from 'src/modules/salle/dto/updateSalleDto.dto';

import { GetQueryDto } from '../dto/getQueryDto';
import { ResponseDto } from '../dto/response.dto';


export class SalleRepository {
    constructor(
        @InjectModel(Salle.name)
        private readonly salleModel: Model<Salle>,
    ) {}

    async createSalle(createsalleDto: CreateSalleDto) {
        const salleExists: any = await this.getSalleByName(createsalleDto.name);

        if (!salleExists.ok) {
            const newsalle = new this.salleModel({
                name: createsalleDto.name,
                film: null,
            });

            try {
                const createdsalle = await newsalle.save();
                return createdsalle;
            } catch (error) {
                throw new InternalServerErrorException('Erreur de connexion à la BDD', error);
            }
        } else {
            throw new ConflictException('Le salle existe déjà!');
        }
    }

    async getSalles(query: GetQueryDto) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let salles: Salle[];

        try {
            if (limit === 0) {
                salles = await this.salleModel
                    .find()
                    .populate('name')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                salles = await this.salleModel
                    .find()
                    .populate('name')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response: ResponseDto;

            if (salles.length > 0) {
                response = {
                    ok: true,
                    data: salles,
                    message: 'Get salles Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'Pas de salles!',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException('Erreur interne, impossible de consulter les salles', error);
        }
    }

    async updateSalle(updateSalle: UpdateSalleDto) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            name: updateSalle.name,
            film: updateSalle.filmId,
            updatedAt: actualDate,
        };

        try {
            const salle = await this.salleModel
                .findOneAndUpdate({ _id: updateSalle.id }, updateData, {
                    new: true,
                })
                .exec();
            return salle;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getSalleById(id: MongooseSchema.Types.ObjectId) {
        try {
            const salle = await this.salleModel.findById(id).exec();

            return salle;
        } catch (error) {
            throw new InternalServerErrorException('Pas de salle enregistré avec un id:' + id, error);
        }
    }

    async getSalleByName(name: string) {
        try {
            const salle = await this.salleModel.find({ name });
            return salle;
        } catch (error) {
            throw new InternalServerErrorException('Erreur interne, impossible de consulter les salles', error);
        }
    }
}