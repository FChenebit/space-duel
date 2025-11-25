import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { IIDGenerator } from "../../../core/ports/IIDGenerator";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { ENEMYSHIP_HEIGHT, ENEMYSHIP_WIDTH, SEnemyShip, SEnemyShipType } from "../entities/SEnemyShip";

export class SNewEnemyShip {
  enemyShipRepository: SIdentifiableRepository<SEnemyShip>;
  idGenerator: IIDGenerator;
  spriteManager: ITKSpriteManager;
  constructor(newEnemyShipRepository: SIdentifiableRepository<SEnemyShip>, newIdGenerator: IIDGenerator, newSpriteManager: ITKSpriteManager) {
    this.enemyShipRepository = newEnemyShipRepository;
    this.idGenerator = newIdGenerator;
    this.spriteManager = newSpriteManager;
  }

  execute(initialX: number, initialY: number, newSpeed : number, newSteering: number,newType : SEnemyShipType) {

    const newRepresentationId = this.spriteManager.newSprite(newType.toString(), initialX, initialY, ENEMYSHIP_WIDTH, ENEMYSHIP_HEIGHT);
    const newId = this.idGenerator.generate();
    const newEnemyShip = new SEnemyShip(newId, initialX, initialY, newRepresentationId, newSpeed, newType, newSteering);
    this.enemyShipRepository.add(newEnemyShip);
  }
}