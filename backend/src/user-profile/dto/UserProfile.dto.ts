import { ChatRoom, ChatRoomMember, Friendship, User } from '@prisma/client';

type ProfileDtoProps = Partial<User> &
  Partial<{
    firstFriendship: Friendship[];
    secondFriendship: Friendship[];
    roomMember: ChatRoomMember[];
    owned_rooms: ChatRoom[];
  }>;

export class UserProfileDto {
  constructor(userData: ProfileDtoProps, is_friend: boolean) {
    this.createdAt = userData.createdAt;
    this.updatedAt = userData.updatedAt;
    this.id = userData.userId;
    this.xp = userData.xp;
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.wallet = userData.wallet;
    this.bio = userData.bio;
    this.email = userData.email;
    this.picture = userData.avatar;
    this.username = userData.username;
    this.isVerified = userData.isVerified;
    this.linkedInLink = userData.linkedInLink;
    this.githubLink = userData.githubLink;
    this.FriendsCount = userData.FriendsCount;
    this.intraId = userData.intraId;
    this.cover = userData.cover;
    const firstFriendship = userData.firstFriendship || [];
    const secondFriendship = userData.secondFriendship || [];
    if (is_friend) {
      this.friendship = [...firstFriendship, ...secondFriendship];
    }
    // this.wonGamesNumber = userData.wonGamesNumber;
  }

  createdAt: Date;
  updatedAt: Date;
  id: string;
  profileFinished: boolean;
  firstName: string;
  lastName: string;
  xp: number;
  wallet: number;
  bio: string;
  phone: string;
  picture: string;
  isVerified: boolean;
  linkedInLink: string;
  githubLink: string;
  FriendsCount: number;
  email: string;
  username: string;
  friendship: Friendship[];
  intraId: string;
  cover: string;
  // wonGamesNumber: number;
}
