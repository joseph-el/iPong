import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { BoardDto } from '../dtos/Board.dto';
import { LocalDbService } from '../local-db.service';

@Injectable()
export class BoardsService {
  constructor(
    private readonly database: DatabaseService,
    private readonly localDbService: LocalDbService,
  ) {}

  async getUserAvailableBoards(userId: string): Promise<BoardDto[]> {
    if (!userId) {
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const userBoards = await this.database.board.findMany({
        where: {
          users: {
            some: {
              userId: userId,
            },
          },
        },
      });
      if (!userBoards) {
        return [];
      }

      const userBoardsData: BoardDto[] = userBoards.map((board) => {
        const userBoard = new BoardDto();
        userBoard.createdAt = board.createdAt;
        userBoard.boardId = board.id;
        userBoard.BoardName = board.name;
        userBoard.BoardImgPath = board.imageUrl;
        userBoard.BoardPrice = board.price;
        return userBoard;
      });
      return userBoardsData;
    } catch (error) {
      console.error('Error fetching user-skins: ', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching the user-skins',
      );
    }
  }

  async addNewBoardToUser(userId: string, BoardName: string) {
    if (!userId || !BoardName) {
      return new HttpException(
        'User ID and Board data are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const boardRecord = this.localDbService.findBoardByTitle(BoardName);
    if (!boardRecord) {
      return new HttpException(
        'No Record to match with requested skin! contact the admin',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      let newBalance: number = 0;
      const user = await this.database.user.findUnique({ where: { userId } });
      if (!user) {
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const boardPrice = boardRecord.price;
      if (user.wallet < boardPrice) {
        return new HttpException(
          'Insufficient wallet balance',
          HttpStatus.PAYMENT_REQUIRED,
        );
      }

      /* User already have this board case */
      const existingBoards = await this.database.user.findUnique({
        where: { userId },
        include: {
          boards: {
            where: {
              name: BoardName,
            },
          },
        },
      });

      if (existingBoards && existingBoards.boards.length > 0) {
        return new HttpException(
          'Board already exist in user collection',
          HttpStatus.CONFLICT,
        );
      }

      const newBoard = await this.database.board.create({
        data: {
          name: boardRecord.name,
          imageUrl: boardRecord.imgPath,
          price: boardRecord.price,
        },
      });

      newBalance = user.wallet - boardPrice;
      /* add Board to user Boards and subtract it from it's wallet */
      await this.database.user.update({
        where: { userId },
        data: {
          wallet: newBalance,
          boards: {
            connect: { id: newBoard.id },
          },
        },
      });
      return newBoard;
    } catch (error) {
      console.error(error);
      return new HttpException(
        'Failed to add Board to user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
