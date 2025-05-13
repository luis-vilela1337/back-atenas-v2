import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User, UsersRepository } from './repositories';
import { UsersController } from './controller';
import { ListUserPaginatedService } from './services/list-pagination.service';

@Module({
  imports: [MikroOrmModule.forFeature([User, UsersRepository])],
  controllers: [UsersController],
  providers: [ListUserPaginatedService],
  exports: [ListUserPaginatedService],
})
export class UsersModule {}
