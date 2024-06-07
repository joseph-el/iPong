import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { AtGuard } from 'src/auth/Guards/access.guard';
import { GetCurrentUser } from 'src/auth/decorators/getCurrentUser.decorator';
import { CreateBoardDto } from '../dtos/createBoard.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}

  @UseGuards(AtGuard)
  @Get('all')
  async handleGetAllUserBoards(@GetCurrentUser('userId') userId: string) {
    return await this.boardService.getUserAvailableBoards(userId);
  }

  @UseGuards(AtGuard)
  @Post('add')
  async handleCreateNewBoard(
    @GetCurrentUser('userId') userId: string,
    @Body() boardInfos: CreateBoardDto,
  ) {
    return await this.boardService.addNewBoardToUser(
      userId,
      boardInfos.imageUrl,
    );
  }
}
