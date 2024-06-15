import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ConnectionService } from 'src/game/connection.service';
import { ConnectedUsersService } from './connected-users.service';
import { InvitationService } from './invitations.service';
import { UserStatus } from 'src/game/enums/user-status.enum';
import { v4 as uuid } from 'uuid';

@Injectable()
export class InviteFriendService {
  private logger: Logger = new Logger(InviteFriendService.name);
  private server: Server;
  constructor(
    private readonly gamePlayersInfo: ConnectionService,
    private readonly connectedUsers: ConnectedUsersService,
    private readonly invitationsService: InvitationService,
  ) {}

  setServer(server: Server) {
    this.server = server;
  }

  handleInviteToGame(client: Socket, userId: string, opponentId: string) {
    if (!this.isUserOnlineAndNotBusy(userId)) {
      client.emit('userStatusError');
      return;
    }

    const opponentSocket = this.connectedUsers.getSocketByUserId(opponentId);
    if (!opponentSocket) {
      client.emit('opponentOfflineNow');
      return;
    }

    if (!this.isUserOnlineAndNotBusy(opponentId)) {
      client.emit('opponentBusyNow');
      return;
    }

    const players: string[] = [];
    const inviteId = uuid();
    this.logger.log(`Invite: ${inviteId} created`);
    players.push(userId);
    players.push(opponentId);
    this.invitationsService.addInvite(inviteId, players);
    opponentSocket.emit('inviteFromFriend', { challengedBy: userId, inviteId });
  }

  handleInviteAcceptation(client: Socket, inviteId: string) {
    const players = this.invitationsService.getInvite(inviteId);

    /* check if opponent still online before accepting */
    const userId = this.connectedUsers.getUserBySocketId(client.id);
    const opponentId = this.findOtherPlayer(players, userId);
    if (opponentId) {
      const opponentSocket = this.connectedUsers.getSocketByUserId(opponentId);
      if (!opponentSocket) {
        client.emit('cancelledInvite');
        return;
      }
      if (!this.isUserOnlineAndNotBusy(opponentId)) {
        client.emit('opponentJoinedAnotherMatch');
        return;
      }
    }
    if (players) {
      players.forEach((player) => {
        const playerSocket = this.connectedUsers.getSocketByUserId(player);
        if (playerSocket) {
          playerSocket.join(inviteId);
        } else {
          this.server.to(inviteId).emit('cancelledInvite');
          const invite = this.invitationsService.getInvite(inviteId);
          if (invite) {
            this.invitationsService.removeInvite(inviteId);
            this.logger.log(`invite: ${inviteId} deleted`);
          }
          return;
        }
        this.server.to(inviteId).emit('launchingInvitationGame', { inviteId });
      });
    }
    this.logger.log(`${inviteId} accepted`);
  }

  handleDestroyInvite(client: Socket, inviteId: string) {
    const invite = this.invitationsService.getInvite(inviteId);
    if (invite) {
      this.invitationsService.removeInvite(inviteId);
      this.logger.log(`invite: ${inviteId} deleted`);
    }
  }

  private findOtherPlayer(players: string[], currentId: string): string | null {
    if (!players) return null;
    for (const player of players) {
      if (player !== currentId) {
        return player;
      }
    }
    return null;
  }

  private isUserOnlineAndNotBusy(userId: string) {
    const userCurrentStatus = this.gamePlayersInfo.getUserStatus(userId);
    if (userCurrentStatus !== undefined) {
      if (userCurrentStatus !== UserStatus.ONLINE) {
        return false;
      }
    }
    return true;
  }
}
