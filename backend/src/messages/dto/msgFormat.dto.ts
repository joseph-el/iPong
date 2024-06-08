import { $Enums, ChatRoomType, Message, User } from '@prisma/client';

export class MessageFormatDto {
  Username: any;
  constructor(
    messageData: Message & {
      author: Partial<User>;
      ChatRoom:ChatRoomType;
    },
  ) {
    this.id = messageData.id;
    this.content = messageData.content;
    this.time = messageData.createdAt;
    this.roomId = messageData.chatRoomId;
    this.authorId = messageData.authorId;
    this.Username = messageData.author.username;
    this.roomType = messageData.ChatRoom;
    this.avatar = messageData.author.avatar;
  }

  id: string;
  content: string;
  time: Date;
  roomId: string;
  authorId: string;
  avatar: string;
  roomType: ChatRoomType;

}
