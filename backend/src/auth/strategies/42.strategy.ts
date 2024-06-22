import { CloudinaryService } from './../../imagesProvider/cloudinary.service';
import { Injectable, Scope } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-42';
import Profile from 'passport-42';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';
import { Response } from 'express';
import VerifiedCallback from 'passport-42';
import { env } from 'process';
import { UserProfileService } from 'src/user-profile/user-profile.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(
    private readonly User: UsersService,
    private readonly AuthService: AuthService,
    private readonly database: DatabaseService,
  ) {
    super({
      clientID: env.FT_CLIENT_ID,
      clientSecret: env.FT_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/42/callback',
      passReqToCallback: true,
    });
  }

  async validate(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: Function,
  ): Promise<any> {
    const res: Response = req.res;
    const UserExust = await this.User.getUserByEmail(
      profile['_json']['email'].toString(),
    );
    if (UserExust) {
      if (UserExust.tfaEnabled) {
        const tfaToken = this.AuthService.generateUniqueToken();

        await this.database.user.update({
          where: { email: UserExust.email },
          data: { tfaToken },
        });

        res.cookie('tfa_token', tfaToken, {
          httpOnly: false,
          maxAge: 15 * 60 * 1000, // 15 minutes
        });
        res.redirect('http://localhost:5173/auth/2fa-login');
        return cb(null, profile);
      }
      const tokens = await this.AuthService.getTokens(
        UserExust.email,
        UserExust.userId,
      );
      await this.AuthService.updateHash(UserExust.userId, tokens.refresh_token);
      res.cookie('access_token', tokens.access_token, {
        httpOnly: false,
      });
      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: false,
        path: '/auth',
      });
      res.redirect('http://localhost:5173/ipong/profile');
      return cb(null, profile);
    }
    const newUser = await this.User.createUser({
      username: profile['_json']['login'],
      firstName: profile['_json']['first_name'],
      lastName: profile['_json']['last_name'],
      intraId: profile['_json']['id'].toString(),
      email: profile['_json']['email'],
      avatar: profile['_json']['image']['link'],
    });
    const tokens = await this.AuthService.getTokens(
      newUser.email,
      newUser.userId,
    );
    await this.AuthService.updateHash(newUser.userId, tokens.refresh_token);
    res.cookie('access_token', tokens.access_token, {
      httpOnly: false,
    });
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: false,
      path: '/auth',
    });
    res.redirect('http://localhost:5173/ipong/profile');

    return cb(null, profile);
  }
}
