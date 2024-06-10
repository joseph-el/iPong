import { ApiProperty } from '@nestjs/swagger';
import { ChatRoom } from '@prisma/client';

export class RoomDataDto {
  constructor(room_dta: ChatRoom) {
    this.id = room_dta.id;
    this.name = room_dta.roomName;
    this.type = room_dta.type;
  }
  id: string;
  name: string;
  type: string;
}
