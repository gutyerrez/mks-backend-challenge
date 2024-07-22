import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieValidator {
  @ApiProperty({
    description: 'Title of the movie',
    example: 'The Matrix',
    required: true
  })
  public title: string;

  @ApiProperty({
    description: 'Synopsis of the movie',
    example: 'A computer hacker learns from mysterious rebels that the world’s financial system is controlled by a powerful artificial intelligence.',
    required: true
  })
  public synopsis: string;

  @ApiProperty({
    description: 'Release date of the movie',
    example: '2003-12-12',
    required: false
  })
  public releaseDate?: Date;
}
