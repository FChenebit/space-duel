import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { ITKUpdateControllerCallback } from "../../../tinker/game-interfaces/TKUpdateControllerCallbackInterface";
import { SRemoveEnemyShip } from "../../enemy-ship/commands/SRemoveEnemyShip";
import { ENEMYSHIP_HEIGHT, ENEMYSHIP_WIDTH, SEnemyShip } from "../../enemy-ship/entities/SEnemyShip";
import { SProjectile } from "../entity/SProjectile";
import { SRemoveProjectile } from "./SRemoveProjectile";

export interface STestCollisionParameter {
  deltaTime: number;
}

export class STestCollision implements ITKUpdateControllerCallback {
  projectileRepository: SIdentifiableRepository<SProjectile>;
  enemyShipRepository: SIdentifiableRepository<SEnemyShip>;
  removeProjectile: SRemoveProjectile;
  removeEnemyShip: SRemoveEnemyShip;
  constructor(newProjectileRepository: SIdentifiableRepository<SProjectile>, newEnemyShipRepository: SIdentifiableRepository<SEnemyShip>,
        newRemoveProjectile: SRemoveProjectile, newRemoveEnemyShip: SRemoveEnemyShip) {
    this.projectileRepository = newProjectileRepository;
    this.enemyShipRepository = newEnemyShipRepository;
    this.removeProjectile = newRemoveProjectile;
    this.removeEnemyShip = newRemoveEnemyShip;
  }

  async activate(parameter: object): Promise<void> {
    const params = parameter as STestCollisionParameter;
    this.onUpdate(params.deltaTime);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onUpdate(_deltaTime: number): void {
    const projectiles = this.projectileRepository.getAll();
    const enemyShips = this.enemyShipRepository.getAll();
    projectiles.forEach((projectile) => {
      enemyShips.forEach((enemyShip) => {
        if((projectile.x > (enemyShip.x-(ENEMYSHIP_WIDTH*0.45))) && 
            (projectile.x < (enemyShip.x+(ENEMYSHIP_WIDTH*0.45))) &&
            (projectile.y > (enemyShip.y-(ENEMYSHIP_HEIGHT*0.45))) &&
            (projectile.y < (enemyShip.y+(ENEMYSHIP_HEIGHT*0.45)))) {
          this.removeProjectile.removeProjectile(projectile);
          this.removeEnemyShip.removeEnemyShip(enemyShip);
        }
      });
    });
  }
}