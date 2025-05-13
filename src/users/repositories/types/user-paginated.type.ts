import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { PaginationMetaResponse } from './paginated.type';

export class PaginatedUsersResponse {
  @ApiProperty({ type: [User] })
  data!: User[];

  @ApiProperty({ type: () => PaginationMetaResponse })
  pagination!: PaginationMetaResponse;
}