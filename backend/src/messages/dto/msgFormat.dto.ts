import { Message, User, ChatRoomType } from '@prisma/client';

export class MessageFormatDto {
  id: string;
  content: string;
  time: Date;
  roomId: string;
  authorId: string;
  avatar: string;
  roomType: ChatRoomType;
  Username: string;

  constructor(
    messageData: Message & {
      author: Partial<User>;
      ChatRoom: { type: ChatRoomType };
    },
  ) {
    this.id = messageData.id;
    this.content = messageData.content;
    this.time = messageData.createdAt;
    this.roomId = messageData.chatRoomId;
    this.authorId = messageData.authorId;
    this.Username = messageData.author.username;
    this.roomType = messageData.ChatRoom.type;
    this.avatar = messageData.author.avatar;
  }
}
