import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@mikro-orm/nestjs';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '@users/repositories';

@Injectable()
export class AuthService {
  private ACCESS_TTL = '15m';

  constructor(
    private readonly jwt: JwtService,
    @InjectRepository(UsersRepository) private readonly usersRepo: UsersRepository,
  ) {}

  async validateUser(email: string, passwordPlain: string) {
    const user = await this.usersRepo.findOne({ email });
    if (!user) return null;

    const matches = await bcrypt.compare(passwordPlain, user.passwordHash);
    return matches ? user : null;
  }

  private signToken(user: any) {
    return this.jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      { expiresIn: this.ACCESS_TTL },
    );
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const token = this.signToken(user);

    return { token, user };
  }

  async logout() {
    return { success: true, message: 'Logout realizado com sucesso' };
  }

  async refresh(currentUser: any) {
    const token = this.signToken(currentUser);
    return { token };
  }
}
