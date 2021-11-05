import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../../dto/getQueryDto';
import { ClientRepository } from '../../repositories/client.repository';
import { CreateClientDto } from './dto/createClient.dto';

@Injectable()
export class ClientService {
    constructor(private readonly clientRepository: ClientRepository) {}

    async createClient(createClientDto: CreateClientDto) {
        return await this.clientRepository.createClient(createClientDto);
    }

    async getClients(getQueryDto: GetQueryDto) {
        return await this.clientRepository.getClients(getQueryDto);
    }

    async getClientById(id: MongooseSchema.Types.ObjectId) {
        return await this.clientRepository.getClientById(id);
    }
}