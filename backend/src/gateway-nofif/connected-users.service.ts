import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ConnectedUsersService {
  private connectedUsersSockets: Map<string, Socket> = new Map();
  private connectedUsersSocketsIds: Map<string, string> = new Map();

  addUserSocket(userId: string, socket: Socket) {
    this.connectedUsersSockets.set(userId, socket);
    this.connectedUsersSocketsIds.set(socket.id, userId);
  }

  removeUserSocket(userId: string) {
    const userSocketId = this.getSocketByUserId(userId)?.id;
    if (userSocketId) {
      this.connectedUsersSocketsIds.delete(userSocketId);
    }
    this.connectedUsersSockets.delete(userId);
  }

  getUserBySocketId(socketId: string) {
    const userId = this.connectedUsersSocketsIds.get(socketId);
    return userId;
  }

  getSocketByUserId(userId: string): Socket | undefined {
    return this.connectedUsersSockets.get(userId);
  }
}
