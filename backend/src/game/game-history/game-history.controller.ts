import { Controller, Get, UseGuards } from '@nestjs/common';
import { PlayedGamesDto } from './dtos/playedGames.dto';
import { AtGuard } from 'src/auth/Guards/access.guard';
import { GetCurrentUser } from 'src/auth/decorators/getCurrentUser.decorator';
import { GameHistoryService } from './game-history.service';

/* use: http://localhost:3000/game-history */

@Controller('game-history')
export class GameHistoryController {
  constructor(private readonly getGameHistoryService: GameHistoryService) {}

  /* GET ALL GAMES OF CURRENT USER */
  @UseGuards(AtGuard)
  @Get()
  async handleGetAllGames(
    @GetCurrentUser('userId') userId: string,
  ): Promise<PlayedGamesDto[]> {
    return await this.getGameHistoryService.handleGetGamesHistory(userId);
  }
}
