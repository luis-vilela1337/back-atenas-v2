import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { User } from '@users/repositories/entities/user.entity';
import { randomUUID } from 'crypto';
import { InstitutionEvent } from './instituition.events';

@Entity({ tableName: 'institutions' })
export class Institution {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @Property({ unique: true, length: 50 })
  contractNumber!: string;

  @Property({ length: 255 })
  name!: string;

  @Property({ nullable: true, type: 'text' })
  observations?: string;

  @Property({ onCreate: () => new Date() })
  createdAt?: Date;

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date;

  @OneToMany(() => User, (user) => user.institution)
  users = new Collection<User>(this);

  @OneToMany(() => InstitutionEvent, (evt) => evt.institution)
  events = new Collection<InstitutionEvent>(this);
}
