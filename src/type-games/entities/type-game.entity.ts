import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Game } from 'src/games/entities/game.entity';

@Entity()
export class TypeGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 100 })
  @IsNotEmpty()
  @IsString()
  typeName: string;

  @Column({length: 500})
  @IsNotEmpty()
  @IsString()
  descriptionType: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Game, (game) => game.typeGame)
  games: Game[];
}
