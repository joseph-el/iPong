import { kickMemberDto } from './dto/kickMember.dto';
import { LeaveRoomDto } from './dto/leaveRoom.dto';
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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateRoomDto } from './dto/update-chatroom.dto';
import { ApiCookieAuth } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/Guards/access.guard';
import { GetCurrentUser } from 'src/auth/decorators/getCurrentUser.decorator';
import { JoinRoomDto } from './dto/JoinRoom.dto';
import { setAdminDto } from './dto/setAdmin.dto';
import { addMemberDto } from './dto/addMember.dto';
import { SearchDto } from './dto/search.dto';
import { ChangeOwnerDto } from './dto/changeOwner.dto';
import { RoomDataDto } from './dto/roomDetails.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiCookieAuth('access_token')
@Controller('chatroom')
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  @UseGuards(AtGuard)
  @Post('create')
  async create(
    @Body() createChatroomDto: CreateChatroomDto,
    @GetCurrentUser('userId') userOwner: string,
  ) {
    console.log("object:>> ", createChatroomDto);
    return await this.chatroomService.create(createChatroomDto, userOwner);
  }

  @UseGuards(AtGuard)
  @Post('rooomIcon/:roomId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadIcon(
    @Param('roomId') roomId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log("object:>> ", roomId);
    return await this.chatroomService.uploadIcon(roomId, file);
  }

  @Post('changeOwner')
  @UseGuards(AtGuard)
  async changeOwner(
    @Body() roomdata: ChangeOwnerDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return await this.chatroomService.changeOwner(roomdata, userId);
  }
  @UseGuards(AtGuard)
  @Post('join')
  async join(
    @Body() joinChatroomDto: JoinRoomDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return this.chatroomService.join(joinChatroomDto, userId);
  }

  @UseGuards(AtGuard)
  @Post('invite')
  async invite(
    @Body() joinedUserId: string,
    @Body() roomdId: string,
    @GetCurrentUser('userId') adminId: string,
  ) {
    return this.chatroomService.invite(joinedUserId, adminId, roomdId);
  }

  @UseGuards(AtGuard)
  @Post('leaveRoom')
  async leaveRoom(
    @Body() leaveRoomDto: LeaveRoomDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return this.chatroomService.leaveRoom(leaveRoomDto, userId);
  }

  @UseGuards(AtGuard)
  @Post('deleteRoom')
  async deleteRoom(
    @Body() deleteRoomDto: LeaveRoomDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return this.chatroomService.deleteRoom(deleteRoomDto, userId);
  }

  @UseGuards(AtGuard)
  @Post('kickMember')
  async kickMember(
    @Body() kickMemberDto: kickMemberDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return this.chatroomService.kickMember(kickMemberDto, userId);
  }

  @UseGuards(AtGuard)
  @Post('setAdmin')
  async setAdmin(
    @Body() setAdminDto: setAdminDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return this.chatroomService.setAdmin(setAdminDto, userId);
  }

  @UseGuards(AtGuard)
  @Post('muteMember')
  async muteMember(
    @Body() muteMemberDto: kickMemberDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return this.chatroomService.muteMember(muteMemberDto, userId);
  }

  @UseGuards(AtGuard)
  @Post('banMember')
  async banMember(
    @Body() banMemberDto: kickMemberDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return this.chatroomService.banMember(banMemberDto, userId);
  }

  @UseGuards(AtGuard)
  @Post('unbanMember')
  async unbanMember(
    @Body() unbanMemberDto: kickMemberDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return this.chatroomService.unbanMember(unbanMemberDto, userId);
  }

  @UseGuards(AtGuard)
  @Post('addMember')
  async addMember(
    @Body() addMemberDto: addMemberDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return this.chatroomService.addMember(addMemberDto, userId);
  }

  // search for all rooms exists
  @UseGuards(AtGuard)
  @Get('getAllRooms')
  async getChatRooms(@Query() query: SearchDto) {
    return await this.chatroomService.getChatRooms(query);
  }

  //get curent user rooms
  @UseGuards(AtGuard)
  @Get('myrooms')
  async listAllRooms(@GetCurrentUser('userId') userId: string) {
    return await this.chatroomService.listAllJoinedRooms(userId);
  }

  //get Last message
  @UseGuards(AtGuard)
  @Get('lastMessage')
  async getLastMessage(roomId: string) {
    return await this.chatroomService.getLastMessage(roomId);
  }

  @UseGuards(AtGuard)
  @Get(':id/members')
  async getMembers(
    @Param('id') id: string,
    @GetCurrentUser('userId') userId: string,
  ) {
    return await this.chatroomService.getMembers(id, userId);
  }

  @UseGuards(AtGuard)
  @Get('getDms')
  async getDms(@GetCurrentUser('userId') userId: string) {
    return await this.chatroomService.getDms(userId);
  }
    
  @UseGuards(AtGuard)
  @Post('update')
  async update(
    @Body() updateChatroomDto: UpdateRoomDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return this.chatroomService.update(updateChatroomDto, userId);
  }
}
