import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { SEnemyShip } from "../entities/SEnemyShip";

export class SRemoveEnemyShip {
  enemyShipRepository: SIdentifiableRepository<SEnemyShip>;
  spriteManager: ITKSpriteManager;
  constructor(newEnemyShipRepository: SIdentifiableRepository<SEnemyShip>, newSpriteManager: ITKSpriteManager) {
    this.enemyShipRepository = newEnemyShipRepository;
    this.spriteManager = newSpriteManager;
  }

  removeEnemyShip(enemyShip: SEnemyShip) {
    this.enemyShipRepository.remove(enemyShip.id);
    this.spriteManager.removeRepresentation(enemyShip.representationId);
  }
}