import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

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

  // @Column()
  // @IsNotEmpty()
  // @IsDate()
  // releaseDate: Date;

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
}
