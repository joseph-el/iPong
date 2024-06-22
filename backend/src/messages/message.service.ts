import { ChatRoom, NotificationType } from '@prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { DatabaseService } from 'src/database/database.service';
import { ChatRoomType } from '@prisma/client';
import { MessageFormatDto } from './dto/msgFormat.dto';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MessageService {
  constructor(
    private database: DatabaseService,
    private eventEmitter: EventEmitter2,
  ) {}
  async create(
    roomId: string,
    senderId: string,
    createMessageDto: CreateMessageDto,
  ) {
    if (!createMessageDto.content) {
      throw new HttpException('Content is required', 400);
    }
    if (createMessageDto.content.length > 500) {
      throw new HttpException('Client message id is invalid', 400);
    }
    const room = await this.database.chatRoom.findUnique({
      where: { id: roomId },
      select: {
        type: true,
        ownerId: true,
        members: {
          where: { memberID: senderId },
        },
      },
    });
    if (!room) {
      throw new HttpException('Room not found', 404);
    }
    if (room.type === ChatRoomType.Dm) {
      const blocked = await this.database.blockedUser.findFirst({
        where: {
          dmId: roomId,
        },
      });
      if (blocked) {
        throw new HttpException('You are blocked', 403);
      }
    }
    const memebr = room.members.find((m) => m.memberID === senderId);
    // console.log(memebr);
    if (!memebr) {
      throw new HttpException('You are not a member of this room', 403);
    }
    if (memebr.isBanned) {
      throw new HttpException('You are banned', 403);
    }
    if (memebr.isMuted) {
      const now = new Date();
      if (memebr.muted_exp < now) {
        throw new HttpException(
          `You are muted for ${memebr.muted_exp.valueOf() - now.valueOf()}`,
          HttpStatus.FORBIDDEN,
        );
      }
      await this.database.chatRoomMember.update({
        where: {
          unique_member_room: {
            chatRoomId: roomId,
            memberID: senderId,
          },
        },
        data: {
          muted_exp: null,
          isMuted: false,
        },
      });
    }

    const message = await this.database.message.create({
      data: {
        content: createMessageDto.content,
        chatRoomId: roomId,
        authorId: senderId,
      },
      include: {
        author: {
          select: {
            avatar: true,
            username: true,
          },
        },
        ChatRoom: {
          select: {
            type: true,
          },
        },
      },
    });
    //fetching room members
    const membersIDs = await this.database.chatRoomMember.findMany({
      where: {
        chatRoomId: roomId,
        isBanned: false,
        isMuted: false,
        NOT: {
          memberID: senderId,
        },
      },
      select: {
        memberID: true,
      },
    });
    //fetching blocked users
    const blockedUsers = await this.database.blockedUser.findMany({
      where: {
        OR: [{ blockedBy: senderId }, { blocked: senderId }],
      },
      select: {
        blocked: true,
        blockedBy: true,
      },
    });
    //Filtering Blocked Room Members:
    const filteredBlockedMembers = membersIDs
      .filter((member) => {
        return blockedUsers.some((blocked) => {
          return (
            blocked.blocked === member.memberID ||
            blocked.blockedBy === member.memberID
          );
        });
      })
      .map((member) => member.memberID);
    // Formatting the Response Message
    const responseMessage = {
      ...message,
      blockedMembers: filteredBlockedMembers,
    };
    //event emitter to all members in the room
    
    console.log('sending message to room:', filteredBlockedMembers);
    for (const member of membersIDs) {
      console.log('sending notification to:', member);
      const notification: CreateNotificationDto = {
        receiverId: member.memberID,
        senderId: senderId,
        entityType: NotificationType.MessageSent,
        id: [senderId, member, message.id].sort().join('+') + 'accepted',
      };
      this.eventEmitter.emit('sendNotification', notification);
    }
      return responseMessage;
  }
  async findAll(userId: string, roomId: string) {
    // Fetching the room details and checking if the user is a member
    const room = await this.database.chatRoom.findUnique({
      where: { id: roomId },
      select: {
        type: true,
        ownerId: true,
        members: {
          where: { memberID: userId },
        },
      },
    });

    if (!room) {
      throw new HttpException('Room not found', 404);
    }

    const roomMember = await this.database.chatRoomMember.findFirst({
      where: {
        memberID: userId,
        chatRoomId: roomId,
      },
    });

    if (!roomMember) {
      throw new HttpException(
        'You are not in this channel',
        HttpStatus.FORBIDDEN,
      );
    }

    const member = room.members.find((m) => m.memberID === userId);
    if (!member) {
      throw new HttpException('You are not a member of this room', 403);
    }

    if (member.isBanned) {
      throw new HttpException('You are banned', 403);
    }

    // Fetching messages
    const messages = await this.database.message.findMany({
      where: {
        chatRoomId: roomId,
        ...(roomMember.isBanned && {
          createdAt: { lte: roomMember.bannedAt },
        }),
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        author: {
          select: {
            avatar: true,
            username: true,
          },
        },
        ChatRoom: {
          select: {
            type: true,
          },
        },
      },
    });

    // Fetching room members excluding the current user
    const membersIDs = await this.database.chatRoomMember.findMany({
      where: {
        chatRoomId: roomId,
        isBanned: false,
        isMuted: false,
        NOT: {
          memberID: userId,
        },
      },
      select: {
        memberID: true,
      },
    });

    // Fetching blocked users
    const blockedUsers = await this.database.blockedUser.findMany({
      where: {
        OR: [{ blockedBy: userId }, { blocked: userId }],
      },
      select: {
        blocked: true,
        blockedBy: true,
      },
    });

    // Filtering blocked room members
    const filteredBlockedMembers = membersIDs
      .filter((member) => {
        return blockedUsers.some((blocked) => {
          return (
            blocked.blocked === member.memberID ||
            blocked.blockedBy === member.memberID
          );
        });
      })
      .map((member) => member.memberID);

    // Formatting the response messages
    const responseMessages = messages.map((message) => {
      return {
        ...message,
        blockedMembers: filteredBlockedMembers,
      };
    });

    // Returning the formatted messages
    return responseMessages.map((message) => new MessageFormatDto(message));
  }
}
