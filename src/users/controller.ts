// src/users/users.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedUsersResponse } from './repositories/types/user-paginated.type';
import { ListUserPaginatedService } from './services/list-pagination.service';
import { ListUsersPaginatedDto } from './dtos/list-paginated.dto';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/user')
export class UsersController {
  constructor(private readonly listUserService: ListUserPaginatedService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'institutionId', required: false, type: String })
  @ApiQuery({ name: 'role', required: false, enum: ['admin', 'client'] })
  @ApiOkResponse({ type: PaginatedUsersResponse })
  listPaginated(@Query() query: ListUsersPaginatedDto) {
    return this.listUserService.execute(query);
  }
}
