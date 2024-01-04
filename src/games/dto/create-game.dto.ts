import {
  IsOptional,
  IsPositive,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { IsDecimal } from '../../helpers/is-decimal.decorator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  gameName: string;

  @IsString()
  @IsNotEmpty()
  gamingPlatform: string;

  @IsString()
  @IsNotEmpty()
  characterUsed: string;

  @IsDecimal()
  @IsPositive()
  @IsOptional()
  highScore?: number;

  @IsString()
  @IsOptional()
  developerStudio?: string;

  @IsDecimal()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsString()
  @IsOptional()
  type?: string;
}
