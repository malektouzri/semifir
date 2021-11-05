import { PartialType } from '@nestjs/mapped-types';
import { CreateSalleDto } from './createSalleDto.dto';

export class UpdateSalleDto extends PartialType(CreateSalleDto) { }