import { Module } from '@nestjs/common';
import { TypeGame } from './entities/type-game.entity';
import { TypeGamesController } from './type-games.controller';
import TypeGamesService from './type-games.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TypeGame])],
  controllers: [TypeGamesController],
  providers: [TypeGamesService],
})
export class TypeGamesModule {}
