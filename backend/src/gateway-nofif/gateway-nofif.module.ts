import { Module, forwardRef } from '@nestjs/common';
import { GatewayNofifGateway } from './gateway-nofif.gateway';
import { JwtService } from '@nestjs/jwt';
import { FriendshipModule } from 'src/friendship/friendship.module';
import { GameModule } from 'src/game/game.module';
import { ConnectedUsersService } from './connected-users.service';
import { InvitationService } from './invitations.service';
import { InviteFriendService } from './invite-friend.service';

@Module({
  imports: [forwardRef(() => GameModule)],
  controllers: [],
  providers: [
    GatewayNofifGateway,
    JwtService,
    ConnectedUsersService,
    InvitationService,
    InviteFriendService,
  ],
  exports: [InvitationService],
})
export class GatewayNofifModule {}
