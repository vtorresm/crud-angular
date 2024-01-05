import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { TypeGame } from '../../type-games/entities/type-game.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 100 })
  @IsNotEmpty()
  @IsString()
  gameName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  gamingPlatform: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  characterUsed: string;

  @Column('decimal', { precision: 5, scale: 2 })
  @IsNotEmpty()
  @IsNumber()
  highScore: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  developerStudio: string;

  @Column('decimal', { precision: 5, scale: 2 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  genre: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => TypeGame, (typeGame) => typeGame.id, {
    eager: true, // para que traiga los tipos al hacer un findOne
  })
  typeName: TypeGame;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: User;

  @Column()
  userEmail: string;
}
