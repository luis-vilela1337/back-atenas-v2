import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ListUsersPaginatedDto } from '@users/dtos/list-paginated.dto';
import { UsersRepository } from '@users/repositories/repository';

@Injectable()
export class ListUserPaginatedService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly repo: UsersRepository,
  ) {}

  async execute(dto: ListUsersPaginatedDto) {
    return this.repo.findPaginated(dto);
  }
}
