import { CloudinaryService } from 'src/imagesProvider/cloudinary.service';
import { UsersService } from 'src/users/users.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileDto } from './dto/UserProfile.dto';
import { AtGuard } from 'src/auth/Guards/access.guard';
import { GetCurrentUser } from 'src/auth/decorators/getCurrentUser.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user-profile')
export class UserProfileController {
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly UsersService: UsersService,
    private readonly CloudinaryService: CloudinaryService,
    private readonly userservice: UsersService,
  ) {}

  @UseGuards(AtGuard)
  @Get('me')
  async getMyProfile(
    @GetCurrentUser('userId') userId: string,
  ): Promise<UserProfileDto> {
    return await this.userProfileService.getMyProfile(userId);
  }

  @UseGuards(AtGuard)
  @Get('getinfoById:userId')
  async getInfo(
    @Param('userId') userId: string,
  ): Promise<UserProfileDto> {
    return await this.userProfileService.getMyProfile(userId);
  }


  @Get(':id')
  @UseGuards(AtGuard)
  async getUserById(
    @Param('id') Id: string,
    @GetCurrentUser('userId') userId: string,
  ): Promise<UserProfileDto> {
    return await this.userProfileService.getFriendProfile(Id, userId);
  }
  @Post('avatar')
  @UseGuards(AtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @GetCurrentUser('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userProfileService.uploadAvatar(userId, file);
  }

  // @UseGuards(AtGuard)
  @Get('avatar')
  async getAvatar(@Body() userId: string) {
    return await this.userProfileService.getAvatar(userId);
  }

  @UseGuards(AtGuard)
  @Post('cover')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCover(
    @GetCurrentUser('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userProfileService.uploadCover(userId, file);
  }

  @UseGuards(AtGuard)
  @Get('cover')
  async getCover(@Body() userId: string) {
    return await this.userservice.getCover(userId);
  }
}
