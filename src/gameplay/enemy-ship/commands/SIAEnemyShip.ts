import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { SMoveObject } from "../../../core/usecase/SMoveObject";
import { ITKUpdateControllerCallback } from "../../../tinker/game-interfaces/TKUpdateControllerCallbackInterface";
import { SPlayerShipRepository } from "../../player-ship/adapters/SPlayerShipRepository";
import { SEnemyShip, SEnemyShipTypeEnum } from "../entities/SEnemyShip";

export const AWARENESS_DISTANCE_PREY = 200;
export const AWARENESS_DISTANCE_HUNTER = 300;
export const MAX_ENEMY_SHIP_STEERING = 0.3;

export interface SIAEnemyShipParameter {
  deltaTime: number;
}

export class SIAEnemyShip implements ITKUpdateControllerCallback {

  enemyShipRepository: SIdentifiableRepository<SEnemyShip>;
  playerShipRepository: SPlayerShipRepository;
  moveShip: SMoveObject;
  elapsedTime: number;
  constructor(newEnemyShipRepository: SIdentifiableRepository<SEnemyShip>, newPlayerShipRepository: SPlayerShipRepository) {
    this.enemyShipRepository = newEnemyShipRepository;
    this.playerShipRepository = newPlayerShipRepository;
    this.moveShip = new SMoveObject();
    this.elapsedTime = 0;
  }
  async activate(parameter: object): Promise<void> {
    const params = parameter as SIAEnemyShipParameter;
    this.onUpdate(params.deltaTime);
  }

  normalizeAngle(angle: number): number {
    if(angle >= Math.PI) {
      angle = angle - (2*Math.PI);
    }
    if(angle < -1 * Math.PI) {
      angle = angle + (2*Math.PI);
    }
    return angle;
  }

  onUpdate(deltaTime: number): void {

    const enemyShips = this.enemyShipRepository.getAll();
    const playerShip = this.playerShipRepository.getPlayerShip();
    let targetRotation = 0;
    enemyShips.forEach((enemyShip:SEnemyShip) => {
      const distanceX = enemyShip.x - playerShip.x;
      const distanceY = enemyShip.y - playerShip.y;
      if(enemyShip.type === SEnemyShipTypeEnum.DRONE) {
        targetRotation = Math.PI/2;
      }
      if(enemyShip.type === SEnemyShipTypeEnum.PREY) {
        const distancePlayerToEnemyShip = Math.sqrt(distanceX*distanceX + distanceY*distanceY);
        if( distancePlayerToEnemyShip < AWARENESS_DISTANCE_PREY) {
          targetRotation = Math.atan2(distanceY,distanceX*-1) - Math.PI;
        }
        if(enemyShip.rotation === 0 && playerShip.rotation !== 0) {
          targetRotation = Math.PI/2;
        }
        if(distancePlayerToEnemyShip > AWARENESS_DISTANCE_HUNTER) {
          targetRotation = Math.PI/2;
        }
      }
      if(enemyShip.type === SEnemyShipTypeEnum.HUNTER) {
        const angleAxeXToEP =  Math.atan2(distanceY,distanceX*-1)*-1;
        
        targetRotation = angleAxeXToEP + Math.PI/2;
        targetRotation = this.normalizeAngle(targetRotation);
      }

      if(this.normalizeAngle(enemyShip.rotation) ===  this.normalizeAngle(targetRotation)) {
        targetRotation = enemyShip.rotation; // case where target = -PI and rotation = PI or target = PI and rotation = -PI
      }
      if(targetRotation === Math.PI && enemyShip.rotation < 0) {
        targetRotation = -Math.PI;
      }
      if(targetRotation === -Math.PI && enemyShip.rotation > 0) {
        targetRotation = Math.PI;
      }
      if (enemyShip.rotation !== targetRotation) {
        let positiveSteeringAngle = targetRotation - enemyShip.rotation;
        positiveSteeringAngle = (positiveSteeringAngle < 0 ? positiveSteeringAngle + (Math.PI * 2) : positiveSteeringAngle);
        const negativeSteeringAngle = -1 * ((Math.PI * 2) - positiveSteeringAngle);
        const steeringDirection = (Math.abs(negativeSteeringAngle) < positiveSteeringAngle ? -1 : 1);
        const steering = Math.min(enemyShip.steering,Math.abs(enemyShip.rotation - targetRotation))*steeringDirection*deltaTime/1000;
        enemyShip.rotation += steering;
        enemyShip.rotation = this.normalizeAngle(enemyShip.rotation);
      }


      this.moveShip.moveObject(enemyShip, deltaTime);
    });
/*    this.elapsedTime += deltaTime;
    if(this.elapsedTime > 10000) {
      this.elapsedTime = 0;
      enemyShips.forEach((enemyShip:SEnemyShip) => {
        console.log('enemy ship x ' + enemyShip.x + ' enemy ship y ' + enemyShip.y + ' enemy ship rotation ' + enemyShip.rotation + ' type ' + enemyShip.type  );
      });
    }*/
  }
  
}