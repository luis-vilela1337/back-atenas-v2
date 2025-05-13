import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaResponse {
  @ApiProperty() total!: number;
  @ApiProperty() page!: number;
  @ApiProperty() limit!: number;
  @ApiProperty() totalPages!: number;
}