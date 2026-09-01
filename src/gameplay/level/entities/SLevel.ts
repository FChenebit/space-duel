import { SEnemyTypeCount } from './SEnemyTypeCount';

export class SLevel {
  level: number;
  enemyTypeCount: SEnemyTypeCount;
  
  constructor(currentLevel: number,currentEnemyTypeCount: SEnemyTypeCount) {
    this.level = currentLevel;
    this.enemyTypeCount = currentEnemyTypeCount;
  }
}