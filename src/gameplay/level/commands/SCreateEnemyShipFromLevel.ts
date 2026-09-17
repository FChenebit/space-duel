import { SNewEnemyShip } from "../../enemy-ship/commands/SNewEnemyShip";
import { SGetEnemyByLevel } from "./SGetEnemyByLevel";
import { SEnemyTypeCount } from "../entities/SEnemyTypeCount";
import { SEnemyShipTypeEnum } from "../../enemy-ship/entities/SEnemyShip";

const START_DISTANCE_FROM_PLAYER = 200;
const DRONE_SPEED = 50;
const DRONE_STEERING = Math.PI / 12;
const PREY_SPEED = 50;
const PREY_STEERING = Math.PI / 8;
const HUNTER_SPEED = 40;
const HUNTER_STEERING = Math.PI / 12;

export class SCreateEnemyShipFromLevel {
  execute(curLevel: number, newEnemyShip: SNewEnemyShip) {
    const getEnemyByLevel = new SGetEnemyByLevel();
    const enemyTypeCount: SEnemyTypeCount = getEnemyByLevel.execute(curLevel);

    for (let iteDrone = 0; iteDrone < enemyTypeCount.droneCount; iteDrone++) {
      const ring = Math.trunc(iteDrone / 4);
      const position = iteDrone - (ring * 4);
      let droneX = 0;
      let droneY = 0;
      switch (position) {
        case 0:
          droneX = 0;
          droneY = 1;
          break;
        case 1:
          droneX = 1;
          droneY = 0;
          break;
        case 2:
          droneX = 0;
          droneY = -1;
          break;
        case 3:
          droneX = -1;
          droneY = 0;
          break;
        default:
          console.log('drone position error : ' + position);
      }
      newEnemyShip.execute(droneX * START_DISTANCE_FROM_PLAYER * (ring + 1),
            droneY * START_DISTANCE_FROM_PLAYER * (ring + 1),
            DRONE_SPEED,DRONE_STEERING,SEnemyShipTypeEnum.DRONE)

    }

    for (let itePrey = 0; itePrey < enemyTypeCount.preyCount; itePrey++) {
      const ring = Math.trunc(itePrey / 2);
      const position = itePrey - (ring * 2);
      let preyX = 0;
      let preyY = 0;

      switch (position) {
        case 0:
          preyX = 1;
          preyY = 1;
          break;
        case 1:
          preyX = -1;
          preyY = -1;
          break;
        default:
          console.log('prey position error : ' + position);
      }

      newEnemyShip.execute(preyX * START_DISTANCE_FROM_PLAYER * (ring + 1),
        preyY * START_DISTANCE_FROM_PLAYER * (ring + 1), PREY_SPEED,
        PREY_STEERING, SEnemyShipTypeEnum.PREY);

    }

    for (let iteHunter = 0; iteHunter < enemyTypeCount.hunterCount; iteHunter++) {
      const ring = Math.trunc(iteHunter / 2);
      const position = iteHunter - (ring * 2);
      let hunterX = 0;
      let hunterY = 0;

      switch (position) {
        case 0:
          hunterX = 1;
          hunterY = -1;
          break;
        case 1:
          hunterX = -1;
          hunterY = 1;
          break;
        default:
          console.log('hunter position error : ' + position);
      }

      newEnemyShip.execute(hunterX * START_DISTANCE_FROM_PLAYER * (ring + 1)*2,
        hunterY * START_DISTANCE_FROM_PLAYER * (ring + 1) *2, HUNTER_SPEED,
        HUNTER_STEERING, SEnemyShipTypeEnum.HUNTER);

    }

  }
}