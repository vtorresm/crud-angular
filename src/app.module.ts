import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { TypeGamesModule } from './type-games/type-games.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GamesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'crud_angular',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TypeGamesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
