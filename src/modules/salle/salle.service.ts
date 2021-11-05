import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { SalleRepository } from 'src/repositories/salle.repository';

import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateSalleDto } from './dto/createSalleDto.dto';

@Injectable()
export class SalleService {
    constructor(private readonly salleRepository: SalleRepository) {}

    async createSalle(createSalleDto: CreateSalleDto) {
        return await this.salleRepository.createSalle(createSalleDto);
    }

    async getSalles(getQueryDto: GetQueryDto) {
        return await this.salleRepository.getSalles(getQueryDto);
    }

    async getSalleById(id: MongooseSchema.Types.ObjectId) {
        return await this.salleRepository.getSalleById(id);
    }
}