import { GatewayNofifGateway } from './../gateway-nofif/gateway-nofif.gateway';
import { usersSearchDto } from './../users/dto/search-user.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { add_friendDto } from './dto/add-friendship.dto';
import { DatabaseService } from 'src/database/database.service';
import { $Enums, ChatRoomType, NotificationType } from '@prisma/client';
import { res_friendship } from './dto/res-friends.dto';
import { profile } from './dto/profile.dto';
import { CreateNotificationDto } from 'src/notifications/dto/create-notification.dto';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';

@Injectable()
export class FriendshipService {
  constructor(
    private databaseservice: DatabaseService,
    private eventEmitter: EventEmitter2,
  ) {}
  async addFriend(add_friendDto: add_friendDto, userId: string) {
    if (add_friendDto.friendId === userId) {
      throw new HttpException(
        'userd id is the same as firend id',
        HttpStatus.FORBIDDEN,
      );
    }
    const user = await this.databaseservice.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const friend = await this.databaseservice.user.findUnique({
      where: {
        userId: add_friendDto.friendId,
      },
    });

    if (!friend) {
      throw new HttpException('Friend not found', HttpStatus.NOT_FOUND);
    }
    const blocked = await this.databaseservice.blockedUser.findFirst({
      where: {
        OR: [
          {
            id: `${userId}+${add_friendDto.friendId}`,
          },
          {
            id: `${add_friendDto.friendId}+${userId}`,
          },
        ],
      },
    });
    if (blocked) {
      throw new HttpException('This user is blocked', HttpStatus.BAD_REQUEST);
    }
    const friendshipId = `${userId}+${add_friendDto.friendId}`;
    const friends = await this.databaseservice.friendship.upsert({
      where: {
        id: friendshipId,
      },
      create: {
        id: friendshipId,
        from: {
          connect: {
            userId,
          },
        },
        to: {
          connect: {
            userId: add_friendDto.friendId,
          },
        },
        status: $Enums.FriendshipStatus.PENDING,
      },
      update: {},
    });
    const responseOfReq = new res_friendship(friends);
    const notification: CreateNotificationDto = {
      receiverId: add_friendDto.friendId,
      senderId: userId,
      entityType: NotificationType.FriendRequest,
      id: [userId, add_friendDto.friendId].sort().join('+') + 'request',
    };
    this.eventEmitter.emit('sendNotification', notification);
    return responseOfReq;
  }

  async unfriend(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new HttpException(
        'User ID is the same as friend ID',
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this.databaseservice.friendship.deleteMany({
      where: {
        OR: [{ id: `${userId}+${friendId}` }, { id: `${friendId}+${userId}` }],
      },
    });

    if (result.count > 0) {
      // Ensure that friendships were actually deleted
      const users = await this.databaseservice.user.findMany({
        where: {
          userId: {
            in: [userId, friendId],
          },
        },
        select: {
          userId: true,
          FriendsCount: true,
        },
      });

      const updates = users.map((user) => {
        if (user.FriendsCount > 0) {
          return this.databaseservice.user.update({
            where: { userId: user.userId },
            data: {
              FriendsCount: {
                decrement: 1,
              },
            },
          });
        } else {
          return Promise.resolve(); // No decrement needed
        }
      });

      await Promise.all(updates);
    }

    return { message: 'done' };
  }

  async isBlocked(userId: string, friendId: string) {
    console.log('userId', userId);
    console.log('friendId', friendId);
    if (userId === friendId) {
      throw new HttpException(
        'userd id is the same as firend id',
        HttpStatus.FORBIDDEN,
      );
    }
    // console.log('userIdhhhhhhh', userId);
    // console.log('friendbbbbbbbbbbbId', friendId);
    const blocked = await this.databaseservice.blockedUser.findFirst({
      where: {
        OR: [
          {
            id: `${userId}+${friendId}`,
          },
          {
            id: `${friendId}+${userId}`,
          },
        ],
      },
      select: {
        blockedBy: true,
        blocked: true,
      },
    });

    //return a boolean value
    console.log('blocked', blocked);
    return blocked;
  }

  async blockedUsers(userId: string) {
    const blocked = await this.databaseservice.blockedUser.findMany({
      where: {
        blockedBy: userId,
      },
      select: {
        blockedId: {
          select: {
            userId: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
            bio: true,
            githubLink: true,
            linkedInLink: true,
            isVerified: true,
            FriendsCount: true,
          },
        },
      },
    });
    return blocked.map((friend) => new profile(friend.blockedId));
  }

  async acceptReq(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new HttpException(
        'User ID is the same as Friend ID',
        HttpStatus.FORBIDDEN,
      );
    }

    const request = await this.databaseservice.friendship.findFirst({
      where: {
        OR: [{ id: `${userId}+${friendId}` }, { id: `${friendId}+${userId}` }],
      },
    });

    if (!request) {
      throw new HttpException('Friend request not found', HttpStatus.NOT_FOUND);
    }

    // Check if the friendship status is already accepted
    if (request.status === $Enums.FriendshipStatus.ACCEPTED) {
      // console.log('Friend request already accepted');
      return new res_friendship(request);
    }

    const result = await this.databaseservice.friendship.updateMany({
      where: {
        OR: [{ id: `${userId}+${friendId}` }, { id: `${friendId}+${userId}` }],
      },
      data: {
        status: $Enums.FriendshipStatus.ACCEPTED,
      },
    });

    if (result) {
      await this.databaseservice.user.updateMany({
        where: {
          userId: {
            in: [userId, friendId],
          },
        },
        data: {
          FriendsCount: {
            increment: 1,
          },
        },
      });
    }
    const notification: CreateNotificationDto = {
      receiverId: friendId,
      senderId: userId,
      entityType: NotificationType.FriendRequestAccepted,
      id: [userId, friendId].sort().join('+') + 'accepted',
    };
    this.eventEmitter.emit('sendNotification', notification);
    return new res_friendship(result);
  }

  async isFriend(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new HttpException(
        'userd id is the same as firend id',
        HttpStatus.FORBIDDEN,
      );
    }
    const request1 = await this.databaseservice.friendship.findFirst({
      where: {
        OR: [{ id: `${userId}+${friendId}` }, { id: `${friendId}+${userId}` }],
        status: $Enums.FriendshipStatus.ACCEPTED,
      },
    });

    return !!request1;
  }

  async rejectFriend(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new HttpException(
        'userd id is the same as firend id',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.databaseservice.friendship.deleteMany({
      where: {
        OR: [{ id: `${userId}+${friendId}` }, { id: `${friendId}+${userId}` }],
      },
    });

    return { send: 'done' };
  }

  async friendList(userId: string) {
    // console.log('userxvxvxvxId', userId);

    const friends = await this.databaseservice.friendship.findMany({
      where: {
        OR: [
          {
            fromUser: userId,
            status: $Enums.FriendshipStatus.ACCEPTED,
          },
          {
            toUser: userId,
            status: $Enums.FriendshipStatus.ACCEPTED,
          },
        ],
      },
      select: {
        from: {
          select: {
            userId: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
            bio: true,
            githubLink: true,
            linkedInLink: true,
            isVerified: true,
            FriendsCount: true,
          },
        },
        to: {
          select: {
            userId: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
            bio: true,
            githubLink: true,
            linkedInLink: true,
            isVerified: true,
            FriendsCount: true,
          },
        },
      },
    });

    const dd = friends.map((friend) => {
      // console.log('friend', friend);
      // console.log('friend.from.userId', friend.from.userId);
      // console.log('friend.to.userId', friend.to.userId);
      if (friend.from.userId == userId) {
        return new profile(friend.to);
      }
      return new profile(friend.from);
    });
    // console.log('dd:::::::::::::::::::::::: ', dd);
    return dd;
  }

  async pendingList(userId: string) {
    const friends = await this.databaseservice.friendship.findMany({
      where: {
        toUser: userId,
        status: $Enums.FriendshipStatus.PENDING,
      },
      select: {
        from: {
          select: {
            userId: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });
    return friends.map((friend) => new profile(friend.from));
  }

  async sentList(userId: string) {
    const friends = await this.databaseservice.friendship.findMany({
      where: {
        fromUser: userId,
        status: $Enums.FriendshipStatus.PENDING,
      },
      select: {
        to: {
          select: {
            userId: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });
    return friends.map((friend) => new profile(friend.to));
  }

  async blockUser(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new HttpException(
        'User id is the same as friend id',
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.databaseservice.user.findUnique({
      where: { userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const friend = await this.databaseservice.user.findUnique({
      where: { userId: friendId },
    });
    if (!friend) {
      throw new HttpException('Friend not found', HttpStatus.NOT_FOUND);
    }

    // Check if the block already exists
    const existingBlock = await this.databaseservice.blockedUser.findFirst({
      where: {
        OR: [{ id: `${userId}+${friendId}` }, { id: `${friendId}+${userId}` }],
      },
    });

    if (existingBlock) {
      if (existingBlock.blockedBy === userId) {
        throw new HttpException(
          'This user is already blocked',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'This user has already blocked you',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // Delete any existing friendship between the users
    await this.databaseservice.friendship.deleteMany({
      where: {
        OR: [{ id: `${userId}+${friendId}` }, { id: `${friendId}+${userId}` }],
      },
    });

    // Find a common direct message room
    const commonRoom = await this.databaseservice.chatRoom.findFirst({
      where: {
        type: ChatRoomType.Dm,
        members: {
          every: { memberID: { in: [userId, friendId] } },
        },
      },
    });

    // Create a new block
    const result = await this.databaseservice.blockedUser.create({
      data: {
        id: `${userId}+${friendId}`,
        blocked: friendId,
        blockedBy: userId,
        dmId: commonRoom?.id,
      },
    });

    if (result) {
      // Ensure that friendships were actually deleted
      const users = await this.databaseservice.user.findMany({
        where: { userId: { in: [userId, friendId] } },
        select: { userId: true, FriendsCount: true },
      });

      const updates = users.map((user) => {
        if (user.FriendsCount > 0) {
          return this.databaseservice.user.update({
            where: { userId: user.userId },
            data: { FriendsCount: { decrement: 1 } },
          });
        } else {
          return Promise.resolve(); // No decrement needed
        }
      });

      await Promise.all(updates);
    }

    return { message: 'done' };
  }

  async unblockUser(userId: string, friendId: string) {
    // console.log(userId, ' unblock ', friendId);
    if (userId === friendId) {
      throw new HttpException(
        'userd id is the same as firend id',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.databaseservice.blockedUser.deleteMany({
      where: {
        AND: [{ blockedBy: userId }, { blocked: friendId }],
      },
    });
    return { send: 'done' };
  }

  async friendshipStatus(userId: string, friendId: string) {
    const friendship = await this.databaseservice.friendship.findFirst({
      where: {
        OR: [{ id: `${userId}+${friendId}` }, { id: `${friendId}+${userId}` }],
      },
      select: {
        status: true,
        from: true,
        to: true,
      },
    });
    return friendship;
  }
  async checkIfBlocked(userId: string, friendId: string) {
    const blocked = await this.databaseservice.blockedUser.findFirst({
      where: {
        OR: [
          {
            id: `${userId}+${friendId}`,
          },
          {
            id: `${friendId}+${userId}`,
          },
        ],
      },
    });
    return blocked;
  }
}
