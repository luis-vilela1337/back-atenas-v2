import { IsInt, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class ListUsersPaginatedDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt() @IsPositive()
  page = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt() @IsPositive()
  limit = 10;

  @IsOptional() @IsString()
  search?: string;

  @IsOptional() @IsUUID()
  institutionId?: string;

  @IsOptional() @IsString()
  role?: 'admin' | 'client';
}
