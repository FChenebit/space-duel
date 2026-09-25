import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { SFactionTypeEnum } from "../../../core/type/SFaction";
import { ITKUpdateControllerCallback } from "../../../tinker/game-interfaces/TKUpdateControllerCallbackInterface";
import { SRemoveEnemyShip } from "../../enemy-ship/commands/SRemoveEnemyShip";
import { ENEMYSHIP_HEIGHT, ENEMYSHIP_WIDTH, SEnemyShip } from "../../enemy-ship/entities/SEnemyShip";
import { SPlayerShipRepository } from "../../player-ship/adapters/SPlayerShipRepository";
import { PLAYER_SHIP_SIZE } from "../../player-ship/commands/SInitPlayerShip";
import { SGameOver } from "../../round/commands/SGameOver";
import { SProjectile, SProjectileTypeEnum } from "../entity/SProjectile";
import { SRemoveProjectile } from "./SRemoveProjectile";

const NORMAL_RADIUS = 0.45
const MINE_RADIUS = 4

export interface STestCollisionParameter {
  deltaTime: number;
}

export class STestCollision implements ITKUpdateControllerCallback {
  projectileRepository: SIdentifiableRepository<SProjectile>;
  enemyShipRepository: SIdentifiableRepository<SEnemyShip>;
  playerShipRepository: SPlayerShipRepository;
  gameOver: SGameOver;
  removeProjectile: SRemoveProjectile;
  removeEnemyShip: SRemoveEnemyShip;
  constructor(newProjectileRepository: SIdentifiableRepository<SProjectile>, newEnemyShipRepository: SIdentifiableRepository<SEnemyShip>,
        newPlayerShipRepository: SPlayerShipRepository, newGameOver: SGameOver,
        newRemoveProjectile: SRemoveProjectile, newRemoveEnemyShip: SRemoveEnemyShip) {
    this.projectileRepository = newProjectileRepository;
    this.enemyShipRepository = newEnemyShipRepository;
    this.playerShipRepository = newPlayerShipRepository;
    this.gameOver = newGameOver;
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
    const playerShip = this.playerShipRepository.getPlayerShip();
    projectiles.forEach((projectile) => {

      let radius = NORMAL_RADIUS;
      if(projectile.type === SProjectileTypeEnum.MINE) {
          radius = MINE_RADIUS;
      }

      if(projectile.faction === SFactionTypeEnum.ENEMY) {
          if((projectile.x > (playerShip.x-(PLAYER_SHIP_SIZE*radius))) && 
              (projectile.x < (playerShip.x+(PLAYER_SHIP_SIZE*radius))) &&
              (projectile.y > (playerShip.y-(PLAYER_SHIP_SIZE*radius))) &&
              (projectile.y < (playerShip.y+(PLAYER_SHIP_SIZE*radius)))) {
            this.removeProjectile.removeProjectile(projectile);
            this.gameOver.launch();
          }
      } else {
        enemyShips.forEach((enemyShip) => {
          if((projectile.x > (enemyShip.x-(ENEMYSHIP_WIDTH*radius))) && 
              (projectile.x < (enemyShip.x+(ENEMYSHIP_WIDTH*radius))) &&
              (projectile.y > (enemyShip.y-(ENEMYSHIP_HEIGHT*radius))) &&
              (projectile.y < (enemyShip.y+(ENEMYSHIP_HEIGHT*radius))) && 
              (projectile.faction !== SFactionTypeEnum.ENEMY)) {
            this.removeProjectile.removeProjectile(projectile);
            this.removeEnemyShip.removeEnemyShip(enemyShip);
          }
        });
      }
    });
  }
}