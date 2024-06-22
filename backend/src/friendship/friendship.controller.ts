import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { add_friendDto } from './dto/add-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { AtGuard } from 'src/auth/Guards/access.guard';
import { GetCurrentUser } from 'src/auth/decorators/getCurrentUser.decorator';
import { isFriendDto } from './dto/isFriend.dto';
import { get } from 'http';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @UseGuards(AtGuard)
  @Post('add')
  async addFriend(
    @Body() add_friendDto: add_friendDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return this.friendshipService.addFriend(add_friendDto, userId);
  }

  @UseGuards(AtGuard)
  @Post('accept')
  async acceptReq(
    @Body() acceptReqDto: add_friendDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    await this.friendshipService.acceptReq(userId, acceptReqDto.friendId);
  }

  @UseGuards(AtGuard)
  @Post('isBlocked/:friendId')
  async isBlocked(
    @GetCurrentUser('userId') userId: string,
    @Param('friendId') friendId: string,
  ) {
    return await this.friendshipService.isBlocked(userId, friendId);
  }

  @UseGuards(AtGuard)
  @Post('reject')
  async rejectReq(
    @Body() rejectReqDto: add_friendDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    // console.log('hahahaha', rejectReqDto.friendId);
    return await this.friendshipService.rejectFriend(userId, rejectReqDto.friendId);
  }

  @UseGuards(AtGuard)
  @Get('blockingList')
  async blockingList(@GetCurrentUser('userId') userId: string) {
    return await this.friendshipService.blockedUsers(userId);
  }

  @UseGuards(AtGuard)
  @Get('isFriend')
  async isFriend(
    @Query() quer: isFriendDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    // console.log(quer.friendId, ' ', userId);
    return await this.friendshipService.isFriend(userId, quer.friendId);
  }

  @UseGuards(AtGuard)
  @Get('')
  async friendList(@GetCurrentUser('userId') userId: string) {
    return await this.friendshipService.friendList(userId);
  }

  @UseGuards(AtGuard)
  @Get('friendList:userId')
  async friendListById(@Param('userId') userId: string) {
    return await this.friendshipService.friendList(userId);
  }

  @UseGuards(AtGuard)
  @Get('pendingList')
  async pendingList(@GetCurrentUser('userId') userId: string) {
    return await this.friendshipService.pendingList(userId);
  }

  @UseGuards(AtGuard)
  @Get('sentList')
  async sentList(@GetCurrentUser('userId') userId: string) {
    return await this.friendshipService.sentList(userId);
  }

  @UseGuards(AtGuard)
  @Post('block')
  async blockUser(
    @Body() friendId: add_friendDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return await this.friendshipService.blockUser(userId, friendId.friendId);
  }

  @UseGuards(AtGuard)
  @Post('unblock/')
  async unblockUser(
    @Body() friendId: add_friendDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return await this.friendshipService.unblockUser(userId, friendId.friendId);
  }

  @UseGuards(AtGuard)
  @Post('unfriend')
  async unfriend(
    @Body() friendId: add_friendDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return await this.friendshipService.unfriend(userId, friendId.friendId);
  }

  @UseGuards(AtGuard)
  @Get('friendshipStatus:friendId')
  async friendshipStatus(
    @Param('friendId') friendId: string,
    @GetCurrentUser('userId') userId: string,
  ) {
    // console.log('------------friendId', friendId);
    // console.log('----------User: ', userId);
    return await this.friendshipService.friendshipStatus(userId, friendId);
  }
}
