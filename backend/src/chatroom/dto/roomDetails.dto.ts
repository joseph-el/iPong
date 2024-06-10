import { ChatRoom } from '@prisma/client';

export class RoomDataDto {
  constructor(room_dta: ChatRoom) {
    this.id = room_dta.id;
    this.name = room_dta.roomName;
    this.type = room_dta.type;
    this.icon = room_dta.icon;
  }
  id: string;
  name: string;
  type: string;
  icon: any;
}
