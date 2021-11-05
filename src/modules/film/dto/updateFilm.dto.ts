import { PartialType } from '@nestjs/mapped-types';

import { CreateFilmDto } from './createFilm.dto';

export class UpdateFilmDto extends PartialType(CreateFilmDto) { }