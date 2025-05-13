// src/auth/types.ts
export interface JwtPayload {
  sub: string;
  email: string;
  role: 'admin' | 'client';
  /** Issued At  (unix epoch seconds) – incluído automaticamente pelo JwtService */
  iat?: number;
  /** Expiration (unix epoch seconds) – incluído automaticamente pelo JwtService */
  exp?: number;
}
