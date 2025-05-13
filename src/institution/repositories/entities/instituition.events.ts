import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { Institution } from './institution.entity';

@Entity({ tableName: 'institution_events' })
export class InstitutionEvent {
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @ManyToOne(() => Institution)
  institution!: Institution;

  @Property({ length: 255 })
  name!: string;

  @Property({ onCreate: () => new Date() })
  createdAt?: Date;

  @Property({ onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date;
}
