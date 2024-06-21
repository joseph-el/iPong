import { TfaDto } from './dto/tfa.dto';
import { CloudinaryService } from 'src/imagesProvider/cloudinary.service';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { DatabaseService } from 'src/database/database.service';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { env } from 'process';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';


@Injectable()
export class AuthService {
  constructor(
    private userservice: UsersService,
    private dataservice: DatabaseService,
    private jwt: JwtService,
  ) { }
  async getTokens(email: string, userId: string): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwt.signAsync(
        { email, userId: userId },
        {
          secret: env.JWT_SECRET,
          expiresIn: '2h',
        },
      ),
      this.jwt.signAsync(
        { email, userId: userId },
        {
          secret: env.JWT_RT_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);
    return { access_token, refresh_token };
  }

  async updateHash(userId: string, rt: string) {
    const hash = await bcrypt.hash(rt, 10);
    await this.dataservice.user.update({
      where: {
        userId,
      },
      data: {
        refreshToken: hash,
      },
    });
  }

  async login(dto: AuthDto): Promise<Tokens> {
    const user = await this.userservice.getUserByEmail(dto.email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
    const tokens = await this.getTokens(user.email, user.userId);
    await this.updateHash(user.userId, tokens.refresh_token);
    return tokens;
  }

  async signup(dto: CreateUserDto): Promise<Tokens> {
    const hashPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.userservice.createUser({
      email: dto.email,
      password: hashPassword,
      username: dto.username,
      bio: dto.bio,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
    const tokens = await this.getTokens(newUser.email, newUser.userId);
    await this.updateHash(newUser.userId, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string) {
    await this.userservice.update(userId, { refreshToken: null });
  }

  async refresh(refresh_token: string, userId: string): Promise<Tokens> {
    const user = await this.userservice.getUserById(userId);

    if (!user) throw new ForbiddenException('User not found');

    if (!user.refreshToken)
      throw new ForbiddenException('Invalid refresh token oo');

    const is_match = await bcrypt.compare(refresh_token, user.refreshToken);
    if (!is_match) throw new ForbiddenException('Invalid refresh token');
    const tokens = await this.getTokens(user.email, user.userId);
    await this.updateHash(user.userId, tokens.refresh_token);

    return tokens;
  }

  async generateTwoFactorAuthSecret(email: string) {
    const secret = speakeasy.generateSecret({
      name: `YourAppName (${email})`,
      length: 20,
    });

    const otpAuthUrl = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `iPong (${email})`,
      encoding: 'base32',
    });

    const qrCode = await qrcode.toDataURL(otpAuthUrl);

    const tfaToken = this.generateUniqueToken();
    const tfaTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

    await this.dataservice.user.update({
      where: { email },
      data: { tfaSecret: secret.base32, tfaToken, tfaTokenExpiry },
    });


    return { qrCode, tfaToken };
  }

  private generateUniqueToken() {
    return require('crypto').randomBytes(32).toString('hex');
  }

  async checkToken(tfaToken: string) {
    const user = await this.dataservice.user.findUnique({
      where: { tfaToken },
      select: {
        tfaToken: true,
        tfaTokenExpiry: true,
      },
    });
    if (!user) return false;
    if (new Date() > new Date(user.tfaTokenExpiry)) {
      await this.dataservice.user.update({
        where: { tfaToken },
        data: { tfaToken: null, tfaTokenExpiry: null },
      });
      return false;
    }
    return true;
  }

  async validateTwoFactorAuth(token: string, tfaToken: string) {
    const user = await this.dataservice.user.findUnique({
      where: { tfaToken },
      select: {
        tfaSecret: true,
        userId: true,
        tfaEnabled: true,
        email: true,
        tfaTokenExpiry: true,
      },
    });

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    if (new Date() > new Date(user.tfaTokenExpiry)) {
      throw new HttpException('Token expired', HttpStatus.BAD_REQUEST);
    }

    if (!user.tfaEnabled) {
      throw new HttpException('Two-factor authentication is not enabled', HttpStatus.BAD_REQUEST);
    }

    const isValid = speakeasy.totp.verify({
      secret: user.tfaSecret,
      encoding: 'base32',
      token,
    });

    if (isValid) {
      await this.dataservice.user.update({
        where: { userId: user.userId },
        data: { tfaToken: null, tfaTokenExpiry: null },
      });
      const tokens = await this.getTokens(user.email, user.userId);
      await this.updateHash(user.userId, tokens.refresh_token);
      return { isValid, tokens };
    }
    return { isValid };
  }
}