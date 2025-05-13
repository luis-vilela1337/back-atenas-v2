import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dtos/login.dto';
import { JwtPayload } from './types/jwt';

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout() {
    return this.auth.logout();
  }

  @UseGuards(JwtAuthGuard)
 @Post('refresh')
refresh(@Req() req: RequestWithUser) {
  return this.auth.refresh(req.user);
}
}
