import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PlayedGamesDto } from './dtos/playedGames.dto';
import { AtGuard } from 'src/auth/Guards/access.guard';
import { GameHistoryService } from './game-history.service';

/* use: http://localhost:3000/game-history */

@Controller('game-history')
export class GameHistoryController {
  constructor(private readonly getGameHistoryService: GameHistoryService) {}

  /* GET ALL GAMES OF CURRENT USER */
  @UseGuards(AtGuard)
  @Get(':id')
  async handleGetAllGames(
    @Param('id') queryId: string,
  ): Promise<PlayedGamesDto[]> {
    return await this.getGameHistoryService.handleGetGamesHistory(queryId);
  }
}
