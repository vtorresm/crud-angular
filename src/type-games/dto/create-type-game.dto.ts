import { IsNotEmpty, IsString } from "class-validator";

export class CreateTypeGameDto {
  @IsString()
  @IsNotEmpty()
  typeName: string;

  @IsString()
  @IsNotEmpty()
  descriptionType: string;
}
