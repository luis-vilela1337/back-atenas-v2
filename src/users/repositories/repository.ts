import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from './entities/user.entity';
import { ListUsersPaginatedDto } from '@users/dtos/list-paginated.dto';

export class UsersRepository extends EntityRepository<User> {

  async findPaginated(params: ListUsersPaginatedDto) {
    const { page, limit, search, institutionId, role } = params;

    const qb = this.createQueryBuilder('u')
      .leftJoinAndSelect('u.institution', 'i')
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy({ 'u.createdAt': 'desc' });

    if (search) {
      qb.andWhere({ $or: [
        { name: { $ilike: `%${search}%` } },
        { email: { $ilike: `%${search}%` } },
      ]});
    }
    if (institutionId) qb.andWhere({ institution: institutionId });
    if (role) qb.andWhere({ role });

    const [data, total] = await qb.getResultAndCount(); 

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
