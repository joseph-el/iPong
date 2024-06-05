import { User, Friendship } from '@prisma/client';

export class profile {
  constructor(friend: Partial<User>) {
    this.firstName = friend?.firstName;
    this.lastName = friend?.lastName;
    this.avatar = friend?.avatar;
    this.uername = friend?.username;
    this.bio = friend?.bio;
    this.github = friend?.githubLink;
    this.linkedin = friend?.linkedInLink;
    this.isVerified = friend?.isVerified;
    this.xp = friend?.xp;
    this.FriendsCount = friend?.FriendsCount;
    this.userId = friend?.userId;

  }
  uername: string;
  firstName: string;
  userId: string;
  lastName: string;
  avatar: string;
  bio: string;
  github: string;
  linkedin: string;
  isVerified: boolean;
  xp: number;
  FriendsCount: number;

}
