import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeGameDto } from './dto/create-type-game.dto';
import { UpdateTypeGameDto } from './dto/update-type-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeGame } from './entities/type-game.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class TypeGamesService {
  constructor(
    @InjectRepository(TypeGame)
    private typeGamesRepository: Repository<TypeGame>,
  ) {}

  create(createTypeGameDto: CreateTypeGameDto) {
    const typeGame = this.typeGamesRepository.create(createTypeGameDto);
    return this.typeGamesRepository.save(typeGame);
  }

  findAll() {
    return this.typeGamesRepository.find();
  }

  async findOne(id: number) {
    const typeGame = await this.typeGamesRepository.findOne({ where: { id } });
    if (!typeGame) {
      throw new NotFoundException(`TypeGame with ID ${id} not found`);
    }
    return typeGame;
  }

  async update(id: number, updateTypeGameDto: UpdateTypeGameDto) {
    const type = await this.findOne(id);
    this.typeGamesRepository.merge(type, updateTypeGameDto);
    return this.typeGamesRepository.save(type);
  }

  remove(id: number) {
    return this.typeGamesRepository.softDelete(id);
  }
}
