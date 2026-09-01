import type { SLevel } from '../entities/SLevel';

export class SLevelRepository {
  private level!: SLevel;

  setLevel(newLevel: SLevel) {
    this.level = newLevel;
  }

  getLevel(): SLevel {
    return this.level;
  }
}