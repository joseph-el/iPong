import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { STORE_DEFAULT } from 'src/store/constants/default-paths';

@Injectable()
export class UsersService {
  constructor(private DatabaseService: DatabaseService) {}
  async createUser(createUserDto: CreateUserDto) {
    return this.DatabaseService.user.create({
      data: {
        ...createUserDto,
        skins: {
          connect: [{ id: STORE_DEFAULT.SKIN_DEFAULT_ID }],
        },
        boards: {
          connect: [{ id: STORE_DEFAULT.BOARD_DEFAULT_ID }],
        },
      },
    });
  }

  async update(userId: string, udateuserDto: UpdateUserDto) {
    if (udateuserDto.password) {
      const hashPassword = await bcrypt.hash(udateuserDto.password, 10);
      udateuserDto.password = hashPassword;
    }
    return this.DatabaseService.user.update({
      where: {
        userId: userId,
      },
      data: udateuserDto,
    });
  }
  
  async getAllUsers(userId: string) {
    const allUsers = await this.DatabaseService.user.findMany();
    //get blockers and blocked by users
    const blockedUsers = await this.DatabaseService.blockedUser.findMany({
      where: {
        OR: [
          {
            blocked: userId,
          },

        ],
      },
    });
    //filter out blocked users and the current user
    const users = allUsers.filter((user) => {
      return (
        !blockedUsers.find((blockedUser) => blockedUser.blockedBy === user.userId) &&
        !blockedUsers.find((blockedUser) => blockedUser.blocked === user.userId) &&
        user.userId !== userId
      );
    });
    return users;
  }



  // TODO: Implement this method and add frindshipId to the user
  async getUserById(userId: string, friendId?: string) {
    return await this.DatabaseService.user.findUnique({
      where: { userId },
      ...(friendId
        ? {
            include: {
              firstFriendship: {
                where: {
                  OR: [
                    { id: `${userId}+${friendId}` },
                    { id: `${friendId}+${userId}` },
                  ],
                },
                select: {
                  status: true,
                  fromUser: true,
                  toUser: true,
                },
              },
              secondFriendship: {
                where: {
                  OR: [
                    { id: `${userId}+${friendId}` },
                    { id: `${friendId}+${userId}` },
                  ],
                },
                select: {
                  status: true,
                  fromUser: true,
                  toUser: true,
                },
              },
            },
          }
        : {}),
    });
  }
  async getUserByUsername(username: string) {
    return this.DatabaseService.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.DatabaseService.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async updateAvatar(id: string, avatar: string) {
    return this.DatabaseService.user.update({
      where: {
        userId: id,
      },
      data: {
        avatar: avatar,
      },
    });
  }

  async updatePassword(id: string, password: string) {
    const hashPassword = await bcrypt.hash(password, 10);

    return this.DatabaseService.user.update({
      where: {
        userId: id,
      },
      data: {
        password: hashPassword,
      },
    });
  }

  async updateUsername(id: string, updateUserDto: UpdateUserDto) {
    return this.DatabaseService.user.update({
      where: {
        userId: id,
      },
      data: {
        username: updateUserDto.username,
      },
    });
  }

  async updateEmail(id: string, updateUserDto: UpdateUserDto) {
    return this.DatabaseService.user.update({
      where: {
        userId: id,
      },
      data: {
        email: updateUserDto.email,
      },
    });
  }

  async updateFirstName(id: string, updateUserDto: UpdateUserDto) {
    return this.DatabaseService.user.update({
      where: {
        userId: id,
      },
      data: {
        firstName: updateUserDto.firstName,
      },
    });
  }

  async updateLastName(id: string, updateUserDto: UpdateUserDto) {
    return this.DatabaseService.user.update({
      where: {
        userId: id,
      },
      data: {
        lastName: updateUserDto.lastName,
      },
    });
  }

  async deleteUser(id: string) {
    return this.DatabaseService.user.delete({
      where: {
        userId: id,
      },
    });
  }

  async getUserByIntraId(intraId: string) {
    return this.DatabaseService.user.findUnique({
      where: {
        intraId: intraId,
      },
    });
  }

  async GetSearchedUsers(name: string, currentUserID: string) {
    const users = await this.DatabaseService.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: name,
              mode: 'insensitive',
            },
          },
          {
            firstName: {
              contains: name,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: name,
              mode: 'insensitive',
            },
          },
        ],
        NOT: {
          OR: [
            {
              blockedUser: {
                some: {
                  blocked: currentUserID,
                },
              },
              blockedByUser: {
                some: {
                  blockedBy: currentUserID,
                },
              },
            },
          ],
        },
      },
    });
    users;
    return users.map((user) => {
      return {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      };
    });
  }
  async getAvatar(id: string) {
    return this.DatabaseService.user.findUnique({
      where: {
        userId: id,
      },
      select: {
        avatar: true,
      },
    });
  }
  async updateCover(id: string, cover: string) {
    return this.DatabaseService.user.update({
      where: {
        userId: id,
      },
      data: {
        cover: cover,
      },
    });
  }

  async getCover(id: string) {
    return this.DatabaseService.user.findUnique({
      where: {
        userId: id,
      },
      select: {
        cover: true,
      },
    });
  }
}
