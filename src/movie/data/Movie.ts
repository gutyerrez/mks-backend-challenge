import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public id: string;

  @Column({ name: 'title', type: 'varchar', length: 255 })
  public title: string;

  @Column({ name: 'synopsis', type: 'text', nullable: true })
  public synopsis: string;

  @Column({ name: 'release_date', type: 'date', nullable: true })
  public releaseDate: Date | undefined;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  public updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  public deletedAt?: Date;

  public alreadyReleased(): boolean {
    return this.releaseDate !== undefined;
  }
}
