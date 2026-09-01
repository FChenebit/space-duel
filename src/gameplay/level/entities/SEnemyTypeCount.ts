export class SEnemyTypeCount {
  droneCount: number;
  preyCount: number;
  hunterCount: number;

  constructor(newDroneCount: number, newPreyCount: number, newHunterCount: number) {
    this.droneCount = newDroneCount;
    this.preyCount = newPreyCount;
    this.hunterCount = newHunterCount;
  }
}