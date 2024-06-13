import { CreateMessageDto } from './../messages/dto/create-message.dto';
import { NotificationType } from '@prisma/client';
import { UsersService } from './../users/users.service';
import { UserProfileService } from './../user-profile/user-profile.service';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Query,
} from '@nestjs/common';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { ChatRoomType } from '@prisma/client';
import { JoinRoomDto } from './dto/JoinRoom.dto';
import { LeaveRoomDto } from './dto/leaveRoom.dto';
import { setAdminDto } from './dto/setAdmin.dto';
import { kickMemberDto } from './dto/kickMember.dto';
import { addMemberDto } from './dto/addMember.dto';
import { SearchDto } from './dto/search.dto';
import { map } from 'rxjs';
import { ChangeOwnerDto } from './dto/changeOwner.dto';
import { UpdateRoomDto } from './dto/update-chatroom.dto';
import { RoomDataDto } from './dto/roomDetails.dto';
import { CloudinaryService } from 'src/imagesProvider/cloudinary.service';
import { Cloudinary } from 'src/imagesProvider/cloudinary';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { MessageService } from 'src/messages/message.service';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { randomUUID } from 'crypto';

@Injectable()
export class ChatroomService {
  constructor(
    private databaseservice: DatabaseService,
    private evventEmitter: EventEmitter2,
    private usersService: UsersService,
    private messages: MessageService,
  ) {}

  async uploadIcon(roomId: string, file: Express.Multer.File) {
    const uploadStream = (fileBuffer: Buffer): Promise<UploadApiResponse> => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'iPong',
            overwrite: true,
            resource_type: 'image',
            unique_filename: false,
            filename_override: roomId + 'icon',
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
    const res = await this.databaseservice.chatRoom.update({
      where: {
        id: roomId,
      },
      data: {
        icon: avatar.secure_url,
      },
    });
    if (!res) {
      throw new HttpException('Room not found', HttpStatus.NOT_FOUND);
    }
    // console.log('Avatar uploaded:', avatar.secure_url);
    return 'Avatar uploaded successfully';
  }

  async create(createChatroomDto: CreateChatroomDto, userOwner: string) {
    // Check if required parameters are provided
    if (
      createChatroomDto.type === ChatRoomType.Dm &&
      !createChatroomDto.secondUser
    ) {
      return new HttpException('Second user is required for dm chatrooms', 400);
    } else if (
      createChatroomDto.type === ChatRoomType.Dm &&
      createChatroomDto.secondUser === userOwner
    ) {
      return new HttpException(
        'You cannot create a dm chatroom with yourself',
        400,
      );
    }
    // Check if password is provided for protected chatrooms and hash it
    if (createChatroomDto.type === 'protected' && createChatroomDto.password) {
      createChatroomDto.password = await bcrypt.hash(
        createChatroomDto.password,
        10,
      );
    }
    // Check if the user exists
    const user = await this.databaseservice.user.findUnique({
      where: {
        userId: userOwner,
      },
    });
    if (!user) {
      return new HttpException('User not found', 404);
    }
    if (createChatroomDto.type === ChatRoomType.Dm) {
      const secondUser = await this.databaseservice.user.findUnique({
        where: {
          userId: createChatroomDto.secondUser,
        },
      });
      if (!secondUser) {
        return new HttpException('Second user not found', 404);
      }
      const ifChatroomExists = await this.databaseservice.chatRoom.findFirst({
        where: {
          type: ChatRoomType.Dm,
          members: {
            every: {
              memberID: {
                in: [userOwner, createChatroomDto.secondUser],
              },
            },
          },
        },
      });
      // console.log(ifChatroomExists);
      if (ifChatroomExists) {
        return ifChatroomExists;
      }
    }
    // Check if user is trying to create a dm chatroom with themselves
    if (
      createChatroomDto.type === ChatRoomType.Dm &&
      userOwner == createChatroomDto.secondUser
    ) {
      return new HttpException(
        'You cannot create a dm chatroom with yourself',
        400,
      );
    }
    // Check if user is blocked by the other user
    // const existingBlock = await this.databaseservice.blockedUser.findFirst({
    //   where: {
    //     OR: [
    //       {
    //         blockedBy: userOwner,
    //         blocked: createChatroomDto.secondUser,
    //       },
    //       {
    //         blockedBy: createChatroomDto.secondUser,
    //         blocked: userOwner,
    //       },
    //     ],
    //   },
    // });

    // if (existingBlock) {
    //   return new HttpException('User is blocked', 403);
    // }

    // Create chatroom
    const room = await this.databaseservice.chatRoom.create({
      data: {
        type: createChatroomDto.type,
        password: createChatroomDto.password,
        roomName: createChatroomDto.roomName,
        owner: {
          connect: { userId: userOwner },
        },
      },
    });
    // Create chatroom owner
    const roomdata = await this.databaseservice.chatRoomMember.create({
      data: {
        member: {
          connect: { userId: userOwner },
        },
        ChatRoom: {
          connect: { id: room.id },
        },
        isAdmin: true,
      },
    });

    // Create chatroom member for second user in case of dm chatroom
    if (createChatroomDto.type === ChatRoomType.Dm) {
      const roomdata = await this.databaseservice.chatRoomMember.create({
        data: {
          member: {
            connect: { userId: createChatroomDto.secondUser },
          },
          ChatRoom: {
            connect: { id: room.id },
          },
          isAdmin: true,
        },
      });
    }
    const pushfirstMessage = await this.messages.create(room.id, userOwner, {
      content: 'Welcome to the chatroom',
    });
    if (!pushfirstMessage) {
      console.log('first message pushed');
    }
    // Return details of created Chatroomcon
    console.log('room created');
    return room;
  }

  async invite(joinedUserId: string, adminId: string, roomId: string) {
    //check if adminId is admin
    const chekAdmin = await this.databaseservice.chatRoomMember.findFirst({
      where: {
        chatRoomId: roomId,
        memberID: adminId,
        isAdmin: true,
      },
    });
    console.log('admin: ', chekAdmin);
    if (!chekAdmin) {
      return new HttpException('You are not an admin', 401);
    }
    //check if joinedUserId is a member
    const checkMember = await this.databaseservice.chatRoomMember.findFirst({
      where: {
        chatRoomId: roomId,
        memberID: joinedUserId,
      },
    });
    if (checkMember) {
      return new HttpException('User is already a member', 400);
    }
    //create chatroom member
    const notification: CreateNotificationDto = {
      senderId: adminId,
      receiverId: joinedUserId,
      entityType: NotificationType.JoinRoom,
      roomId: roomId,
      id: randomUUID(),
    };
    this.evventEmitter.emit('sendNotification', notification);
    return { message: `${joinedUserId} User has been added to the chatroom` };
  }

  async join(joinChatroomDto: JoinRoomDto) {
    try {
      const chatroom = await this.databaseservice.chatRoom.findUnique({
        where: { id: joinChatroomDto.roomId },
      });

      if (!chatroom) {
        throw new HttpException('Chatroom not found', 404);
      }

      if (joinChatroomDto.inviterId) {
        const isInviterIsAdmin =
          await this.databaseservice.chatRoomMember.findFirst({
            where: {
              chatRoomId: joinChatroomDto.roomId,
              memberID: joinChatroomDto.inviterId,
              isAdmin: true,
            },
          });

        if (!isInviterIsAdmin) {
          throw new HttpException(
            'Inviter is not an admin of the chatroom',
            401,
          );
        }
      } else {
        if (
          chatroom.type === ChatRoomType.protected &&
          !joinChatroomDto.password
        ) {
          throw new HttpException('Password is required to join', 400);
        }

        if (chatroom.type === ChatRoomType.protected) {
          const isMatch = await bcrypt.compare(
            joinChatroomDto.password,
            chatroom.password,
          );
          if (!isMatch) {
            throw new HttpException('Invalid password', 401);
          }
        }
      }

      const member = await this.databaseservice.chatRoomMember.findFirst({
        where: {
          chatRoomId: chatroom.id,
          memberID: joinChatroomDto.userId,
        },
      });
      if (member) {
        throw new HttpException('Already a member of the chatroom', 400);
      }

      await this.databaseservice.chatRoomMember.create({
        data: {
          member: { connect: { userId: joinChatroomDto.userId } },
          ChatRoom: { connect: { id: chatroom.id } },
        },
      });

      return { message: `${joinChatroomDto.userId} joined the chatroom` };
    } catch (error) {
      throw error;
    }
  }

  async getRoomDetails(roomId: string) {
    const room = await this.databaseservice.chatRoom.findUnique({
      where: {
        id: roomId,
      },
      select: {
        id: true,
        roomName: true,
        type: true,
        icon: true,

        // members: {
        //   select: {
        //     memberID: true,
        //     isAdmin: true,
        //     isBanned: true,
        //     isMuted: true,
        //     muted_exp: true,
        //   },
        // },
      },
    });
    return room;
  }

  async changeOwner(roomdata: ChangeOwnerDto, userId: string) {
    const room = await this.databaseservice.chatRoom.findUnique({
      where: { id: roomdata.roomId },
      select: {
        ownerId: true,
        members: {
          where: {
            memberID: roomdata.memberId,
          },
        },
      },
    });
    //NOTE: test the members
    const member = await this.databaseservice.chatRoomMember.findUnique({
      where: {
        unique_member_room: {
          memberID: roomdata.memberId,
          chatRoomId: roomdata.roomId,
        },
      },
      select: { memberID: true },
    });
    if (room.ownerId !== userId)
      throw new BadRequestException('You are not the owner of this room');
    if (!member)
      throw new BadRequestException('user is not a member of this room');
    await this.databaseservice.chatRoom.update({
      where: { id: roomdata.roomId },
      data: { owner: { connect: { userId: roomdata.memberId } } },
    });
    await this.databaseservice.chatRoomMember.update({
      where: { id: roomdata.memberId },
      data: { isAdmin: true },
    });
    return { message: 'roomOwner changed successfully' };
  }

  async leaveRoom(leaveRoomDto: LeaveRoomDto, userId: string) {
    // Find chatroom
    const chatroom = await this.databaseservice.chatRoom.findUnique({
      where: {
        id: leaveRoomDto.roomId,
      },
    });

    // Check if chatroom exists
    if (!chatroom) {
      return new HttpException('Chatroom not found', 404);
    }

    // Check if user is a member of the chatroom
    const member = await this.databaseservice.chatRoomMember.findFirst({
      where: {
        chatRoomId: chatroom.id,
        memberID: userId,
      },
    });

    if (!member) {
      return new HttpException('Not a member of the chatroom', 400);
    }
    const { ownerId } = await this.databaseservice.chatRoom.findUnique({
      where: {
        id: leaveRoomDto.roomId,
      },
      select: {
        ownerId: true,
      },
    });
    const newOwner = await this.databaseservice.chatRoomMember.findFirst({
      where: {
        chatRoomId: leaveRoomDto.roomId,
        memberID: {
          not: ownerId,
        },
      },
    });
    if (ownerId === userId && !newOwner) {
      throw new HttpException('You cannot leave the room', 400);
    }
    if (ownerId === userId && newOwner) {
      await this.databaseservice.chatRoom.update({
        where: {
          id: leaveRoomDto.roomId,
        },
        data: { owner: { connect: { userId: newOwner.memberID } } },
      });
    }

    // Delete chatroom member
    await this.databaseservice.chatRoomMember.delete({
      where: {
        id: member.id,
      },
    });

    // console.log('the user has left the room');
    return { message: 'Left the chatroom' };
  }

  async deleteRoom(deleteRoomDto: LeaveRoomDto, userId: string) {
    // Find chatroom
    const chatroom = await this.databaseservice.chatRoom.findUnique({
      where: {
        id: deleteRoomDto.roomId,
      },
      select: {
        ownerId: true,
      },
    });

    // Check if chatroom exists
    if (!chatroom) {
      return new HttpException('Chatroom not found', 404);
    }
    // Check if user is the owner of the chatroom
    if (chatroom.ownerId !== userId) {
      return new HttpException('Not the owner of the chatroom', 403);
    }

    // Delete chatroom
    await this.databaseservice.chatRoom.delete({
      where: {
        id: deleteRoomDto.roomId,
      },
    });
    // console.log('the room has been deleted');
    return { message: 'Chatroom deleted' };
  }

  async setAdmin(setAdminDto: setAdminDto, userId: string) {
    const chatRoom = await this.databaseservice.chatRoom.findUnique({
      where: {
        id: setAdminDto.roomId,
      },
      select: {
        ownerId: true,
      },
    });

    if (!chatRoom) {
      return new HttpException('Chatroom not found', 404);
    }
    const owner = await this.databaseservice.chatRoomMember.findFirst({
      where: {
        chatRoomId: setAdminDto.roomId,
        memberID: setAdminDto.memberId,
      },
      select: {
        isAdmin: true,
      },
    });
    if (chatRoom.ownerId !== userId) {
      return new HttpException('ur nor the onwer', 401);
    }
    if (owner.isAdmin || chatRoom.ownerId === setAdminDto.memberId) {
      return new HttpException('User is already an admin', 400);
    }
    await this.databaseservice.chatRoomMember.update({
      where: {
        unique_member_room: {
          chatRoomId: setAdminDto.roomId,
          memberID: setAdminDto.memberId,
        },
      },
      data: {
        isAdmin: true,
      },
    });
    return { message: 'User is now an admin' };
  }
  async kickMember(roomData: ChangeOwnerDto, userId: string) {
    const room = await this.databaseservice.chatRoom.findUnique({
      where: { id: roomData.roomId },
      select: { ownerId: true },
    });
    const user = await this.databaseservice.chatRoomMember.findUnique({
      where: {
        unique_member_room: { memberID: userId, chatRoomId: roomData.roomId },
      },
    });
    const member = await this.databaseservice.chatRoomMember.findUnique({
      where: {
        unique_member_room: {
          memberID: roomData.memberId,
          chatRoomId: roomData.roomId,
        },
      },
    });
    if (!room) throw new HttpException('room not found', HttpStatus.NOT_FOUND);
    if (!member)
      throw new HttpException('member not found', HttpStatus.NOT_FOUND);
    if (!user.isAdmin || user.isBanned)
      throw new BadRequestException('You are not admin of this room');
    if (member.memberID === room.ownerId)
      throw new BadRequestException('You can not kick the owner of this room');
    if (member.memberID === userId)
      throw new BadRequestException('You can not kick yourself');
    return await this.databaseservice.chatRoomMember.delete({
      where: {
        unique_member_room: {
          memberID: roomData.memberId,
          chatRoomId: roomData.roomId,
        },
      },
    });
  }

  async muteMember(roomData: ChangeOwnerDto, userId: string) {
    const room = await this.databaseservice.chatRoom.findUnique({
      where: { id: roomData.roomId },
      select: {
        ownerId: true,
        members: {
          where: {
            OR: [
              {
                memberID: roomData.memberId,
              },
              {
                memberID: userId,
              },
            ],
          },
        },
      },
    });
    //NOTE: check members content
    const user = await this.databaseservice.chatRoomMember.findUnique({
      where: { unique_member_room: { memberID: userId, chatRoomId: roomData.roomId } },
    });
    const member = await this.databaseservice.chatRoomMember.findUnique({
      where: {
        unique_member_room: {
          memberID: roomData.memberId,
          chatRoomId: roomData.roomId,
        },
      },
      select: {
        chatRoomId: true,
        isMuted: true,
        memberID: true,
      },
    });
    if (!room) throw new HttpException('room not found', HttpStatus.NOT_FOUND);
    if (!member)
      throw new HttpException('member not found', HttpStatus.NOT_FOUND);
    if (!user.isAdmin || user.isBanned)
      throw new BadRequestException('You are not admin of this room');
    if (member.isMuted)
      throw new BadRequestException('Member is already muted');
    if (room.ownerId === roomData.memberId)
      throw new BadRequestException('You cannot mute the owner');
    if (member.memberID === userId)
      throw new BadRequestException('You can not mute yourself');
    const afterFiveMin = new Date(Date.now() + 5 * 60 * 1000);
    await this.databaseservice.chatRoomMember.update({
      where: {
        unique_member_room: {
          memberID: roomData.memberId,
          chatRoomId: roomData.roomId,
        },
      },
      data: { isMuted: true, muted_exp: afterFiveMin },
    });
  }
  async banMember(memberData: ChangeOwnerDto, userId: string) {
    const user = await this.databaseservice.chatRoomMember.findUnique({
      where: {
        unique_member_room: { memberID: userId, chatRoomId: memberData.roomId },
      },
    });
    const { ownerId } = await this.databaseservice.chatRoom.findUnique({
      where: { id: memberData.roomId },
    });

    if (!user || !user.isAdmin || user.isBanned)
      throw new BadRequestException('You are not the admin of this Room');
    if (userId == memberData.memberId)
      throw new BadRequestException('You cannot ban yourself');
    if (ownerId == memberData.memberId)
      throw new BadRequestException('You cannot ban the Owner of this Room');
    await this.databaseservice.chatRoomMember.update({
      where: {
        unique_member_room: {
          memberID: memberData.memberId,
          chatRoomId: memberData.roomId,
        },
      },
      data: {
        isBanned: true,
        bannedAt: new Date(Date.now()),
      },
    });
    return { message: 'member banned successfully' };
  }
  async unbanMember(memberData: ChangeOwnerDto, userId: string) {
    const user = await this.databaseservice.chatRoomMember.findUnique({
      where: {
        unique_member_room: { memberID: userId, chatRoomId: memberData.roomId },
      },
    });
    const member = await this.databaseservice.chatRoomMember.findUnique({
      where: {
        unique_member_room: {
          memberID: memberData.memberId,
          chatRoomId: memberData.roomId,
        },
      },
    });
    if (!member)
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    if (!member.isBanned)
      throw new HttpException('member is not banned', HttpStatus.BAD_REQUEST);
    if (!user.isAdmin)
      throw new BadRequestException('You are not admin of this room');
    await this.databaseservice.chatRoomMember.update({
      where: {
        unique_member_room: {
          memberID: memberData.memberId,
          chatRoomId: memberData.roomId,
        },
      },
      data: {
        isBanned: false,
      },
    });
    return { message: 'member unbanned successfully' };
  }

  async addMember(addMemberDto: addMemberDto, userId: string) {
    // Find chatroom
    const chatroom = await this.databaseservice.chatRoom.findUnique({
      where: {
        id: addMemberDto.roomId,
      },
    });

    // Check if chatroom exists
    if (!chatroom) {
      return new HttpException('Chatroom not found', 404);
    }
    const user = await this.databaseservice.chatRoomMember.findFirst({
      where: {
        chatRoomId: addMemberDto.roomId,
        memberID: userId,
      },
    });
    if (!user) {
      return new HttpException('ur Not a member of the chatroom', 400);
    }

    // Check if user is already a member of the chatroom
    const member = await this.databaseservice.chatRoomMember.findFirst({
      where: {
        chatRoomId: chatroom.id,
        memberID: addMemberDto.memberId,
      },
    });
    if (member) {
      return new HttpException('Already a member of the chatroom', 400);
    }

    // Create chatroom member
    await this.databaseservice.chatRoomMember.create({
      data: {
        member: {
          connect: { userId: addMemberDto.memberId },
        },
        ChatRoom: {
          connect: { id: chatroom.id },
        },
      },
    });

    // Return details of the chatroom
    return { message: 'Member added to the chatroom' };
  }

  async getAllUnjoinedRooms(userId: string) {
    const chatrooms = await this.databaseservice.chatRoom.findMany({
      where: {
        members: {
          none: {
            memberID: userId,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return chatrooms;
  }

  async listAllJoinedRooms(userId: string) {
    const chatrooms = await this.databaseservice.chatRoom.findMany({
      where: {
        members: {
          some: {
            memberID: userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        members: true,
      },
    });
    return Promise.all(
      chatrooms.map(async (room) => {
        const lastMsg = await this.getLastMessage(room.id);
        if (room.type === ChatRoomType.Dm) {
          const memberDetails = await Promise.all(
            room.members.map(async (member) => ({
              member: await this.usersService.getUserById(member.memberID),
            })),
          );
          return {
            id: room.id,
            name: room.roomName,
            type: room.type,
            icon: room.icon,
            members: memberDetails,
            lastMessage: lastMsg,
          };
        } else {
          return {
            id: room.id,
            name: room.roomName,
            type: room.type,
            icon: room.icon,
            lastMessage: lastMsg,
          };
        }
      }),
    );
  }

  async getMembers(roomId: string, userId: string) {
    const chatroom = await this.databaseservice.chatRoom.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!chatroom) {
      return new HttpException('Chatroom not found', 404);
    }

    const member = await this.databaseservice.chatRoomMember.findFirst({
      where: {
        chatRoomId: roomId,
        memberID: userId,
      },
    });

    if (!member) {
      return new HttpException('Not a member of the chatroom', 400);
    }

    const members = await this.databaseservice.chatRoomMember.findMany({
      where: {
        chatRoomId: roomId,
      },
    });

    return Promise.all(
      members.map(async (member) => {
        const userData = await this.usersService.getUserById(member.memberID);
        return {
          isAdmin: member.isAdmin,
          isBanned: member.isBanned,
          isMuted: member.isMuted,
          muted_exp: member.muted_exp,
          joinedAt: member.createdAt,
          member: userData,
        };
      }),
    );
  }

  async update(updateRoomDto: UpdateRoomDto, userId: string) {
    const roomId = updateRoomDto.roomId;

    // Remove roomId from roomData to avoid updating it in the database
    delete updateRoomDto.roomId;

    // Fetch the room from the database to check its existence and ownership
    const room = await this.databaseservice.chatRoom.findUnique({
      where: { id: roomId },
      select: { ownerId: true, type: true },
    });
    if (!room) {
      throw new HttpException('Chatroom not found', 404);
    }
    // Check if the room type is 'dm' (direct message) which should not be updated
    if (room.type === ChatRoomType.Dm) {
      throw new HttpException(
        'dm room can not be updated',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (updateRoomDto.type == 'protected' && !updateRoomDto.password) {
      throw new HttpException(
        'missing password for protected room',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (updateRoomDto.type == 'protected' && updateRoomDto.password) {
      updateRoomDto.password = await bcrypt.hash(updateRoomDto.password, 10);
    }
    if (updateRoomDto.type == 'public' || updateRoomDto.type == 'private') {
      updateRoomDto.password = null;
    }
    const updateRoom = await this.databaseservice.chatRoom.update({
      where: { id: roomId },
      data: updateRoomDto,
    });
    return { message: 'Room updated successfully' };
  }

  async getDms(userId: string) {
    const dms = await this.databaseservice.chatRoom.findMany({
      where: {
        type: ChatRoomType.Dm,
        members: {
          some: {
            memberID: userId,
          },
        },
      },
    });
    // return dms.map((dm) => {
    //   return {
    //     id: dm.id,
    //     type: dm.type,
    //     members: dm.members.map((member) => {
    //       return {
    //         id: member.memberID,
    //         isAdmin: member.isAdmin,
    //         isBanned: member.isBanned,
    //         isMuted: member.isMuted,
    //         muted_exp: member.muted_exp,
    //         joinedAt: member.createdAt,
    //       };
    //     }),
    //   };
    // });
  }

  async getLastMessage(roomId: string) {
    const message = await this.databaseservice.message.findFirst({
      where: {
        chatRoomId: roomId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return message;
  }
}
