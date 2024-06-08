import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
  } from '@nestjs/websockets';
  import { Socket } from 'socket.io';
  import { Logger } from '@nestjs/common';


  @WebSocketGateway({ namespace: 'check' })
  export class CheckGateway 
    implements OnGatewayConnection, OnGatewayDisconnect {
        private logger: Logger = new Logger(CheckGateway.name);
  
    handleConnection(client: Socket): any {
      console.warn('Client connected:', client.id);
    }
  
    handleDisconnect(client: Socket): any {
      // Implementation goes here\
      console.warn('Client disconnected:', client.id);
    }
  }