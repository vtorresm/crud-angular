import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeGameDto } from './create-type-game.dto';

export class UpdateTypeGameDto extends PartialType(CreateTypeGameDto) {}
