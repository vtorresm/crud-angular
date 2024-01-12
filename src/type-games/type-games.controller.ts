import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { CreateTypeGameDto } from './dto/create-type-game.dto';
import { Role } from 'src/common/enums/role.enum';
import { UpdateTypeGameDto } from './dto/update-type-game.dto';
import { TypeGamesService } from './type-games.service';

@Auth(Role.ADMIN)
@Controller('type-games')
export class TypeGamesController {
  constructor(private readonly typeGamesService: TypeGamesService) {}

  @Post()
  async create(@Body() createTypeGameDto: CreateTypeGameDto) {
    try {
      return await this.typeGamesService.create(createTypeGameDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      return this.typeGamesService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.typeGamesService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTypeGameDto: UpdateTypeGameDto,
  ) {
    try {
      return this.typeGamesService.update(id, updateTypeGameDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.typeGamesService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
