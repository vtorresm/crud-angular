import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { TypeGame } from '../type-games/entities/type-game.entity';
import { ActiveUserInterface } from '../common/interfaces/active-user.interface';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(TypeGame)
    private readonly typeGameRepository: Repository<TypeGame>,
  ) {}

  async create(createGameDto: CreateGameDto, user: ActiveUserInterface) {
    const typeName = await this.validateGameType(createGameDto.typeName);

    try {
      return this.gameRepository.save({
        ...createGameDto,
        typeName,
        userEmail: user.email,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error saving the game');
    }
  }

  async findAll(user: ActiveUserInterface) {
    return user.role === 'ADMIN'
      ? await this.gameRepository.find()
      : await this.gameRepository.find({ where: { userEmail: user.email } });
  }

  async findOne(id: number, user: ActiveUserInterface) {
    let game;
    try {
      game = await this.gameRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new BadRequestException(`Game with ID ${id} not found`);
    }

    this.validateUserAccess(user, game);

    return game;
  }

  async update(
    id: number,
    updateGameDto: UpdateGameDto,
    user: ActiveUserInterface,
  ) {
    await this.findOne(id, user);

    const typeName = updateGameDto.typeName
      ? await this.validateGameType(updateGameDto.typeName)
      : undefined;

    try {
      return this.gameRepository.update(id, {
        ...updateGameDto,
        typeName,
        userEmail: user.email,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error updating the game');
    }
  }

  async remove(id: number, user: ActiveUserInterface) {
    await this.findOne(id, user);
    return this.gameRepository.softDelete({ id }); // se le pasa el id
  }

  private async validateGameType(typeName: string) {
    const type = await this.typeGameRepository.findOneBy({ typeName });

    if (!type) {
      throw new BadRequestException(`TypeGame with name ${typeName} not found`);
    }

    return type;
  }

  private validateUserAccess(user: ActiveUserInterface, game: Game) {
    const isNotAdminAndNotGameOwner =
      user.role !== Role.ADMIN && game.userEmail !== user.email;
    if (isNotAdminAndNotGameOwner) {
      throw new UnauthorizedException(
        `User with email ${user.email} is not authorized to access this game`,
      );
    }
  }
}
