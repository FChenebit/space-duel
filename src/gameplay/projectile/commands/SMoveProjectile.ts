import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { SFactionTypeEnum } from "../../../core/type/SFaction";
import { SFollowObject } from "../../../core/usecase/SFollowObject";
import { SMoveObject } from "../../../core/usecase/SMoveObject";
import { ITKUpdateControllerCallback } from "../../../tinker/game-interfaces/TKUpdateControllerCallbackInterface";
import { SEnemyShip } from "../../enemy-ship/entities/SEnemyShip";
import { SPlayerShipRepository } from "../../player-ship/adapters/SPlayerShipRepository";
import { SProjectile, SProjectileTypeEnum } from "../entity/SProjectile";

export interface SMoveProjectileParameter {
  deltaTime: number;
}

export class SMoveProjectile implements ITKUpdateControllerCallback {
  projectileRepository: SIdentifiableRepository<SProjectile>;
  enemyShipRepository: SIdentifiableRepository<SEnemyShip>;
  playerShipRepository: SPlayerShipRepository;
  moveProjectile: SMoveObject;
  followShip: SFollowObject;
  elapsedTime: number;
  constructor(newProjectileRepository: SIdentifiableRepository<SProjectile>, 
    newEnemyShipRepository: SIdentifiableRepository<SEnemyShip>, newPlayerShipRepository: SPlayerShipRepository
  ) {
    
    this.projectileRepository = newProjectileRepository;
    this.enemyShipRepository = newEnemyShipRepository;
    this.playerShipRepository = newPlayerShipRepository;
    this.moveProjectile = new SMoveObject();
    this.followShip = new SFollowObject();
    this.elapsedTime = 0;
  }
  async activate(parameter: object): Promise<void> {
    const params = parameter as SMoveProjectileParameter;
    this.onUpdate(params.deltaTime);
  }

  onUpdate(deltaTime: number): void {
    
    const playerShip = this.playerShipRepository.getPlayerShip();

    this.projectileRepository.getAll().forEach((projectile: SProjectile) => {
      if(projectile.type === SProjectileTypeEnum.MISSILE) {
        let targetRotation = 0;
        if(projectile.faction === SFactionTypeEnum.ENEMY) {
          targetRotation = this.followShip.computeRotation(projectile, playerShip);
          this.followShip.setSteering(projectile, targetRotation, deltaTime);
        } else {
          let curTargetDistance = Number.MAX_VALUE;
          let curEnemy = undefined;
          this.enemyShipRepository.getAll().forEach((enemy: SEnemyShip) => {
            const enemyToPlayerDistance = ((enemy.x - projectile.x) * (enemy.x - projectile.x)) + 
              ((enemy.y - projectile.y) * (enemy.y - projectile.y));
            if(enemyToPlayerDistance < curTargetDistance) {
              curEnemy = enemy;
              curTargetDistance = enemyToPlayerDistance;
            }
          });
          if(curEnemy !== undefined) {
            targetRotation = this.followShip.computeRotation(projectile, curEnemy);
            this.followShip.setSteering(projectile, targetRotation, deltaTime);
          }
        }
      }
      this.moveProjectile.moveObject(projectile, deltaTime);
    });
    this.elapsedTime += deltaTime;
    if(this.elapsedTime > 10000) {
      this.elapsedTime = 0;
      //console.log('projectile count ' + this.projectileRepository.count());
    }
  }
}