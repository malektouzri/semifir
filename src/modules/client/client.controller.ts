import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../../dto/getQueryDto';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/createClient.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('client')
export class ClientController {
    constructor(private clientService: ClientService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/createClient')
    async createClient(@Body() createClientDto: CreateClientDto, @Res() res: any) {
        const newClient = await this.clientService.createClient(createClientDto);
        return res.status(HttpStatus.OK).send(newClient);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/getClients')
    async getClients(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const clients: any = await this.clientService.getClients(getQueryDto);
        return res.status(HttpStatus.OK).send(clients);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/getClientById/:id')
    async getClientById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any) {
        const client: any = await this.clientService.getClientById(id);
        return res.status(HttpStatus.OK).send(client);
    }
}