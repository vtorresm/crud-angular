import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { Game } from './entities/game.entity';
import { TypeGamesModule } from '../type-games/type-games.module';
import TypeGamesService from '../type-games/type-games.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), TypeGamesModule],
  controllers: [GamesController],
  providers: [GamesService, TypeGamesService],
})
export class GamesModule {}
