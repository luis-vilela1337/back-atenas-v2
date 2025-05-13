import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
} from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { Institution } from '@institution/repositories/entities/institution.entity';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @Property({ length: 255 })
  name!: string;
  @Property({ unique: true, length: 50 })
  identifier!: string;
  @Property({ unique: true, length: 255 })
  email!: string;
  @Property({ length: 20 })
  phone!: string;
  @Property({ nullable: true, type: 'text' })
  observations?: string;
  @Property() passwordHash!: string;

  @Property({ columnType: 'varchar(20)' })
  role!: 'admin' | 'client';

  @ManyToOne(() => Institution) institution!: Institution;

  @Property({ nullable: true, length: 255 })
  fatherName?: string;
  @Property({ nullable: true, length: 20 })
  fatherPhone?: string;
  @Property({ nullable: true, length: 255 })
  motherName?: string;
  @Property({ nullable: true, length: 20 })
  motherPhone?: string;
  @Property({ nullable: true, length: 255 })
  driveLink?: string;
  @Property({ nullable: true, columnType: 'numeric(10,2)' })
  creditValue?: string;
  @Property({ nullable: true, length: 255 })
  profileImage?: string;

  @Property({ columnType: 'varchar(20)' })
  status!: 'active' | 'inactive';

  @Property({ onCreate: () => new Date() }) createdAt?: Date;
  @Property({ onUpdate: () => new Date(), nullable: true }) updatedAt?: Date;
}
