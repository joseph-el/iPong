import { profile } from './../friendship/dto/profile.dto';
import { usersSearchDto } from './../users/dto/search-user.dto';
import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserProfileDto } from './dto/UserProfile.dto';
import { DatabaseService } from 'src/database/database.service';
import { CloudinaryService } from 'src/imagesProvider/cloudinary.service';
import { Readable } from 'stream';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import { FriendshipService } from 'src/friendship/friendship.service';

@Injectable()
export class UserProfileService {
  constructor(
    private databaseservice: DatabaseService,
    private UsersService: UsersService,
    private CloudinaryService: CloudinaryService,
    private friendservice: FriendshipService,
  ) {}
  async getMyProfile(userId: string) {
    const currentuser = await this.UsersService.getUserById(userId);
    console.log('Current user:', currentuser);
    if (!currentuser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return new UserProfileDto({ ...currentuser }, false);
  }

  async getFriendProfile(userId: string, friendId: string) {
    const blocked = this.friendservice.checkIfBlocked(userId, friendId);
    if (!blocked) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    console.log('userId:', userId, 'friendId:', friendId);
    const friend = await this.UsersService.getUserById(userId, friendId);
    console.log('Friend:', friend);
    if (!friend) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return new UserProfileDto({ ...friend }, true);
  }

  async uploadAvatar(
    userId: string,
    file: Express.Multer.File,
  ): Promise<string> {
    console.log('Upload avatar:', userId, file);

    const uploadStream = (fileBuffer: Buffer): Promise<UploadApiResponse> => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'iPong',
            overwrite: true,
            resource_type: 'image',
            unique_filename: false,
            filename_override: userId,
            use_filename: true,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );

        stream.end(fileBuffer);
      });
    };

    const avatar: UploadApiResponse = await uploadStream(file.buffer);
    const res = await this.UsersService.updateAvatar(userId, avatar.secure_url);
    if (!res) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    console.log('Avatar uploaded:', avatar.secure_url);
    return 'Avatar uploaded successfully';
  }
  async getAvatar(userId: string) {
    console.log('Get avatar:', userId);
    // return;
    return await this.UsersService.getAvatar(userId);
  }
}
