import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { PUNISHMENT_USER_XP, USER_XP_REWARDS } from './constants/rewards.user';
import { GAME_SETTINGS } from './constants/game.settings';

@Injectable()
export class RewardsUserService {
  private logger: Logger = new Logger(RewardsUserService.name);

  constructor(private readonly database: DatabaseService) {}

  /* discipline the user that left before the match start*/
  async disciplineUser(userId: string) {
    if (!userId) {
      this.logger.warn(`could not punish user: ${userId} because he left game`);
      return;
    }

    try {
      const user = await this.database.user.findUnique({
        where: { userId: userId },
        select: {
          xp: true,
        },
      });
      if (user) {
        let initialUserXp = user.xp;
        const newXp = (initialUserXp += PUNISHMENT_USER_XP.LEAVE_GAME);
        await this.database.user.update({
          where: { userId: userId },
          data: {
            xp: newXp,
          },
        });
      }
    } catch (error) {
      this.logger.error(`could not discipline User: ${userId}`);
      this.logger.error(`because: ${error.error}`);
    }
  }

  /* Reward the user that stayed through the game */
  async rewardLeftUser(userId: string) {
    if (!userId) {
      this.logger.warn(`could not reward user: ${userId} for staying`);
      return;
    }

    try {
      const user = await this.database.user.findUnique({
        where: { userId: userId },
        select: {
          xp: true,
        },
      });
      if (user) {
        let initialUserXp = user.xp;
        const newXp = (initialUserXp += USER_XP_REWARDS.DID_NOT_LEAVE);
        await this.database.user.update({
          where: { userId: userId },
          data: {
            xp: newXp,
          },
        });
      }
    } catch (error) {
      this.logger.error(`could not reward ${userId} for staying...`);
      this.logger.error(`because: ${error.error}`);
    }
  }

  /* Reward Game Winner */
  async rewardGameWinner(
    userId: string,
    winnerScore: number,
    loserScore: number,
    winnerVBucks: number,
  ) {
    if (!userId) {
      this.logger.warn(`could not reward Game Winner: ${userId}`);
      return;
    }

    try {
      const user = await this.database.user.findUnique({
        where: { userId: userId },
        select: {
          xp: true,
          wallet: true,
        },
      });

      if (user) {
        let newXp = user.xp;
        const addToWallet = user.wallet + winnerVBucks;

        if (winnerScore !== GAME_SETTINGS.GAME_TARGET) {
          newXp += USER_XP_REWARDS.OTHER_PLAYER_LEFT_WIN;
        } else {
          if (loserScore === 0) {
            newXp += USER_XP_REWARDS.WINNER_X_LARGE_XP_AMOUNT;
          } else if (
            loserScore > 0 &&
            loserScore <= GAME_SETTINGS.GAME_TARGET
          ) {
            newXp += USER_XP_REWARDS.WINNER_LARGE_XP_AMOUNT;
          } else if (loserScore > 0 && loserScore > GAME_SETTINGS.GAME_TARGET) {
            newXp += USER_XP_REWARDS.WINNER_SM_XP_AMOUNT;
          }
        }

        await this.database.user.update({
          where: { userId: userId },
          data: {
            xp: newXp,
            wallet: addToWallet,
          },
        });
      }
    } catch (error) {
      this.logger.error(`could not reward Game Winner: ${userId}`);
      this.logger.error(`because: ${error.error}`);
    }
  }

  /* Reward Game Loser */
  async rewardGameLoser(
    userId: string,
    winnerScore: number,
    loserScore: number,
    loserVBucks: number,
  ) {
    if (!userId) {
      this.logger.warn(`could not reward Game Loser: ${userId}`);
      return;
    }
    try {
      const user = await this.database.user.findUnique({
        where: { userId: userId },
        select: {
          xp: true,
          wallet: true,
        },
      });
      if (user) {
        const addToWallet = user.wallet + loserVBucks;
        let newXp = user.xp;

        if (loserScore === 0) {
          newXp += USER_XP_REWARDS.LOSER_S_XP_AMOUNT;
        } else if (
          loserScore > 0 &&
          loserScore < GAME_SETTINGS.GAME_TARGET / 2
        ) {
          newXp += USER_XP_REWARDS.LOSER_M_XP_AMOUNT;
        } else if (
          loserScore > 0 &&
          loserScore >= GAME_SETTINGS.GAME_TARGET / 2
        ) {
          newXp += USER_XP_REWARDS.LOSER_L_XP_AMOUNT;
        } else {
          newXp += USER_XP_REWARDS.LOSER_CASE_LEFT_GAME;
        }

        await this.database.user.update({
          where: { userId: userId },
          data: {
            xp: newXp,
            wallet: addToWallet,
          },
        });
      }
    } catch (error) {
      this.logger.error(`could not reward Game Loser: ${userId}`);
      this.logger.error(`because: ${error.error}`);
    }
  }
}
