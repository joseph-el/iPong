import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chatchat' })

export class ChatGateway 
  implements OnGatewayConnection, OnGatewayDisconnect {


  handleConnection(client: Socket): any {
    console.warn('Client connected:', client.id);
  }

  handleDisconnect(client: Socket): any {
    // Implementation goes here\
    console.warn('Client disconnected:', client.id);
  }
}