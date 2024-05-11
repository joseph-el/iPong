import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayloadWithRt } from '../types/jwtPayloadRT.type';

export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RtStrategy.cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: 'rt-Secretkey',
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }
  private static cookieExtractor(@Req() req: Request) {
    if (req.cookies && req.cookies['refresh_token'])
      return req.cookies['refresh_token'];
    return null;
  }
  async validate(@Req() req: Request, payload: any): Promise<JwtPayloadWithRt> {
    const refreshToken = RtStrategy.cookieExtractor(req);
    return { userId: payload.sub, email: payload.email, refreshToken };
  }
}
