import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ClientModule } from './modules/client/client.module';
import { SalleModule } from './modules/salle/salle.module';
import { FilmModule } from './modules/film/film.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [
    ConfigModule,
    ClientModule,
    SalleModule,
    FilmModule,
    ReservationModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get('MONGO_USER')}:${configService.get('MONGO_PASSWORD')}@cluster0.bkwav.mongodb.net/${configService.get('MONGO_DATABASE')}?retryWrites=true&w=majority}`,
      }),
      inject: [ConfigService],
    }),
    AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
