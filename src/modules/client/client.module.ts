import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Client, ClientSchema } from '../../entities/client.entity';
import { ClientRepository } from '../../repositories/client.repository';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    ],
    controllers: [ClientController],
    providers: [ClientService, ClientRepository],
    exports: [ClientService, ClientRepository],
})
export class ClientModule {}