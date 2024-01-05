import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeGame } from './entities/type-game.entity';
import { TypeGamesController } from './type-games.controller';
import { TypeGamesService } from './type-games.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeGame])],
  controllers: [TypeGamesController],
  providers: [TypeGamesService],
  exports: [TypeOrmModule],
})
export class TypeGamesModule {}
