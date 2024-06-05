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
    this.id = userData.userId;
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.bio = userData.bio;
    this.email = userData.email;
    this.picture = userData.avatar;
    this.username = userData.username;
    this.level = userData.level;
    this.isVerified = userData.isVerified;
    this.linkedInLink = userData.linkedInLink;
    this.githubLink = userData.githubLink;
    this.FriendsCount = userData.FriendsCount;
    const firstFriendship = userData.firstFriendship || [];
    const secondFriendship = userData.secondFriendship || [];
    if (is_friend) {
      this.friendship = [...firstFriendship, ...secondFriendship];
    }
    // this.wonGamesNumber = userData.wonGamesNumber;
  }

  id: string;
  profileFinished: boolean;
  firstName: string;
  lastName: string;
  bio: string;
  phone: string;
  createdAt: Date;
  picture: string;
  level: number;
  isVerified: boolean;
  linkedInLink: string;
  githubLink: string;
  FriendsCount: number;
  email: string;
  username: string;
  friendship: Friendship[];
  // wonGamesNumber: number;
}
