import { Injectable } from '@nestjs/common';

@Injectable()
export class InvitationService {
  private runningInvites: Map<string, string[]> = new Map();

  addInvite(inviteId: string, players: string[]) {
    if (inviteId && players) {
      this.runningInvites.set(inviteId, players);
    }
  }

  getInvite(inviteId: string): string[] {
    const players = this.runningInvites.get(inviteId);
    return players;
  }

  removeInvite(inviteId: string) {
    this.runningInvites.delete(inviteId);
  }
}
