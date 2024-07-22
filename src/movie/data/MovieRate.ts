import { Movie } from '@gutyerrez/mks-backend-challenge/movie/data/Movie';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'movie_rate' })
export class MovieRate {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public id: string;

  @Column({ name: 'movie_id', type: 'uuid', nullable: false })
  public movieId: string;

  @Column({ name: 'rating', type: 'integer', default: 0, nullable: false })
  public rating: number;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  public updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  public deletedAt?: Date;

  @ManyToOne(() => Movie)
  public movie: Movie;
}
