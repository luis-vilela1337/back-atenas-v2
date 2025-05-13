import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Institution } from '@institution/repositories/entities/institution.entity';
import { User } from '@users/repositories';


@Global()
@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: [User, Institution],
    }),
  ],
  exports: [MikroOrmModule],
})
export class DatabaseModule {}
