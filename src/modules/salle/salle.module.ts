import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Salle, SalleSchema } from 'src/entities/salle.entity';
import { SalleRepository } from 'src/repositories/salle.repository';
import { SalleController } from './salle.controller';
import { SalleService } from './salle.service';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Salle.name, schema: SalleSchema }]),
    ],
    controllers: [SalleController],
    providers: [SalleService, SalleRepository],
    exports: [SalleService, SalleRepository],
})
export class SalleModule {}