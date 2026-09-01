import { SEnemyTypeCount } from "../entities/SEnemyTypeCount";

export class SGetEnemyByLevel {
  execute(curLevel: number): SEnemyTypeCount {
    let baseCount = Math.trunc(curLevel / 6);
    let currentCase = curLevel - (baseCount * 6);
    let droneSupplement = 0;
    let preySupplement = 0;
    let hunterSupplement = 0;
    if (currentCase == 1 || currentCase == 3 || currentCase == 5) {
      droneSupplement = 1;
    }
    if (currentCase == 2 || currentCase == 3) {
      preySupplement = 1;
    }
    if (currentCase == 4 || currentCase == 5) {
      hunterSupplement = 1;
    }
    return new SEnemyTypeCount(baseCount + droneSupplement,
      baseCount + preySupplement, baseCount + hunterSupplement);
  }
}