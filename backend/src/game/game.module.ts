import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { MatchmakingService } from './matchmaking.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ClientService } from './client.service';
import { ConnectionService } from './connection.service';
import { GameHistoryController } from './game-history/game-history.controller';
import { GameHistoryService } from './game-history/game-history.service';
import { RewardsUserService } from './rewards.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  providers: [
    GameGateway,
    GameService,
    MatchmakingService,
    ClientService,
    ConnectionService,
    GameHistoryService,
    RewardsUserService,
  ],
  controllers: [GameHistoryController],
})
export class GameModule {}
