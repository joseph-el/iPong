import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { DatabaseService } from 'src/database/database.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { GatewayNofifModule } from 'src/gateway-nofif/gateway-nofif.module';
import { GatewayNofifGateway } from 'src/gateway-nofif/gateway-nofif.gateway';

@Module({
  controllers: [FriendshipController],
  providers: [
    FriendshipService,
    DatabaseService,
    NotificationsService,
    JwtService,
  ],
})
export class FriendshipModule {}
