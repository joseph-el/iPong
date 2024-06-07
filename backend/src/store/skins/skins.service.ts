import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SkinsDto } from '../dtos/skin.dto';
import { DatabaseService } from 'src/database/database.service';
import { LocalDbService } from '../local-db.service';

@Injectable()
export class SkinsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly localDbService: LocalDbService,
  ) {}

  async getUserAvailableSkins(userId: string): Promise<SkinsDto[]> {
    if (!userId) {
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }
    try {
      const userSkins = await this.database.skin.findMany({
        where: {
          users: {
            some: {
              userId: userId,
            },
          },
        },
      });
      if (!userSkins) {
        return [];
      }

      const userSkinsData: SkinsDto[] = userSkins.map((skin) => {
        const userSkin = new SkinsDto();
        userSkin.createdAt = skin.createdAt;
        userSkin.skinId = skin.id;
        userSkin.skinName = skin.name;
        userSkin.skinImgPath = skin.imageUrl;
        userSkin.skinPrice = skin.price;
        return userSkin;
      });
      return userSkinsData;
    } catch (error) {
      console.error('Error fetching user-skins: ', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching the user-skins',
      );
    }
  }

  async addNewSkinToUser(userId: string, skinPath: string) {
    if (!userId || !skinPath) {
      return new HttpException(
        'User ID and skin data are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const skinRecord = this.localDbService.findSkinByPath(skinPath);
    if (!skinRecord) {
      return new HttpException(
        'No Record to match with requested skin! contact the admin',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      let newBalance: number = 0;
      const user = await this.database.user.findUnique({ where: { userId } });
      if (!user) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const skinPrice = skinRecord.price;
      if (user.wallet < skinPrice) {
        return new HttpException(
          'Insufficient wallet balance',
          HttpStatus.PAYMENT_REQUIRED,
        );
      }

      /* User already have this skin case */
      const existingSkins = await this.database.user.findUnique({
        where: { userId },
        include: {
          skins: {
            where: {
              imageUrl: skinPath,
            },
          },
        },
      });
      if (existingSkins && existingSkins.skins.length > 0) {
        return new HttpException(
          'Skin already exist in user collection',
          HttpStatus.CONFLICT,
        );
      }

      const newSkin = await this.database.skin.create({
        data: {
          name: skinRecord.name,
          imageUrl: skinRecord.imgPath,
          price: skinRecord.price,
        },
      });

      newBalance = user.wallet - skinPrice;
      /* add skin to user skins and subtract it from it's wallet */
      await this.database.user.update({
        where: { userId },
        data: {
          wallet: newBalance,
          skins: {
            connect: { id: newSkin.id },
          },
        },
      });
      return newSkin;
    } catch (error) {
      console.error(error);
      return new HttpException(
        'Failed to add skin to user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
