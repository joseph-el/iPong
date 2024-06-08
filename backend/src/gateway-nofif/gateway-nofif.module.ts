import { Module, forwardRef } from '@nestjs/common';
import { GatewayNofifGateway } from './gateway-nofif.gateway';
import { JwtService } from '@nestjs/jwt';
import { FriendshipModule } from 'src/friendship/friendship.module';

@Module({
    controllers: [],
    providers: [GatewayNofifGateway,JwtService],
})
export class GatewayNofifModule {}
