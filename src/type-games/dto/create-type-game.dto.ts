import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTypeGameDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  typeName: string;

  @IsString()
  @IsNotEmpty()
  descriptionType: string;
}
