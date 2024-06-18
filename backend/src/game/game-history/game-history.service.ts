import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { PlayedGamesDto } from './dtos/playedGames.dto';
import { PlayedGameDto } from './dtos/playedGame.dto';

@Injectable()
export class GameHistoryService {
  constructor(private readonly database: DatabaseService) {}

  async getALlGames(): Promise<PlayedGameDto[]> {
    try {
      const allGames = await this.database.game.findMany();
      if (!allGames.length) {
        return [];
      }
      const allGamesDto: PlayedGameDto[] = allGames.map((game) => {
        const tmpGame = new PlayedGameDto();
        tmpGame.id = game.id;
        tmpGame.Player1 = game.player1Id;
        tmpGame.Player2 = game.player2Id;
        tmpGame.createdAt = game.createdAt;
        tmpGame.winner = game.winnerId;
        tmpGame.status = game.gameStatus;
        return tmpGame;
      });
      return allGamesDto;
    } catch (error) {
      console.error('Error fetching all games history: ', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching all games history',
      );
    }
  }

  async handleGetGamesHistory(queryId: string): Promise<PlayedGamesDto[]> {
    if (!queryId) return [];

    try {
      const games = await this.database.game.findMany({
        where: {
          OR: [{ player1Id: queryId }, { player2Id: queryId }],
        },
      });
      if (!games.length) {
        return [];
      }

      const playedGamesData: PlayedGamesDto[] = games.map((game) => {
        const playedGame = new PlayedGamesDto();
        playedGame.gameId = game.id;
        playedGame.createdAt = game.createdAt;
        playedGame.opponentId =
          game.player1Id === queryId ? game.player2Id : game.player1Id;
        playedGame.status = game.winnerId === queryId ? 'win' : 'loss';
        playedGame.winnerVbucks = game.winnerVbucks;
        playedGame.loserVVbucks = game.loserVbucks;
        return playedGame;
      });

      return playedGamesData;
    } catch (error) {
      console.error('Error fetching game-history: ', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching game-history',
      );
    }
  }
}
