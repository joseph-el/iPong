import { Injectable } from '@nestjs/common';
import { Skin } from './interfaces/skin.interface';
import { Board } from './interfaces/board.interface';
import { SKIN_DB } from './db/skins.db';
import { BOARDS_DB } from './db/board.db';

@Injectable()
export class LocalDbService {
  private skins: Skin[] = SKIN_DB;
  private boards: Board[] = BOARDS_DB;

  /* check if skin available if yes return it  */

  findSkinByPath(path: string): Skin | undefined {
    return this.skins.find((skin) => skin.imgPath === path);
  }

  findBoardByTitle(path: string): Board | undefined {
    return this.boards.find((board) => board.imgPath === path);
  }
}
