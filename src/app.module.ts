import { DatabaseModule } from '@database/module';
import { Module } from '@nestjs/common';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
