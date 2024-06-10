import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/Guards/access.guard';
import { GetCurrentUser } from 'src/auth/decorators/getCurrentUser.decorator';
import { SkinsService } from './skins.service';
import { CreateSkinDto } from '../dtos/createSkin.dto';

@Controller('skins')
export class SkinsController {
  constructor(private readonly skinsService: SkinsService) {}

  /* get all user available skins */
  @UseGuards(AtGuard)
  @Get('all')
  async handleGetAllUserSkins(@GetCurrentUser('userId') userId: string) {
    return await this.skinsService.getUserAvailableSkins(userId);
  }

  /* create a skin for this user */
  @UseGuards(AtGuard)
  @Post('add')
  async handleCreateNewSkin(
    @GetCurrentUser('userId') userId: string,
    @Body() skinInfos: CreateSkinDto,
  ) {
    return await this.skinsService.addNewSkinToUser(userId, skinInfos.SkinName);
  }
}
