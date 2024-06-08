import { Module } from '@nestjs/common';
import { SkinsController } from './skins/skins.controller';
import { SkinsService } from './skins/skins.service';
import { BoardsController } from './boards/boards.controller';
import { BoardsService } from './boards/boards.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalDbService } from './local-db.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [SkinsController, BoardsController],
  providers: [SkinsService, BoardsService, LocalDbService],
})
export class StoreModule {}
