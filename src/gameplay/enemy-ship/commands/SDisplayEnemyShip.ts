import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { ISPlayerShipMoveCallback } from "../../player-ship/interface/SPlayerShipMoveCallback";
import { SEnemyShip } from "../entities/SEnemyShip";

export class SDisplayEnemyShip implements ISPlayerShipMoveCallback {

  enemyShipRepository: SIdentifiableRepository<SEnemyShip>;
  spriteManager: ITKSpriteManager;
  sceneWidth: number;
  sceneHeight: number;

  constructor(newEnemyShipRepository: SIdentifiableRepository<SEnemyShip>, newSpriteManager: ITKSpriteManager, newSceneWidth: number, newSceneHeight: number) {
    this.enemyShipRepository = newEnemyShipRepository;
    this.spriteManager = newSpriteManager;
    this.sceneWidth = newSceneWidth;
    this.sceneHeight = newSceneHeight;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPlayerShipMove(newXPlayerShip: number, newYPlayerShip: number, _deltaX: number, _deltaY: number): void {
    const enemyShips = this.enemyShipRepository.getAll();
    enemyShips.forEach((enemyShip: SEnemyShip) => {
      const distanceX = enemyShip.x - newXPlayerShip;
      const distanceY = enemyShip.y - newYPlayerShip;      
      this.spriteManager.moveRepresentationToXY(enemyShip.representationId, this.sceneWidth/2 + distanceX, this.sceneHeight/2 + distanceY);
      this.spriteManager.rotateRepresantationToAngle(enemyShip.representationId, enemyShip.rotation);
    });
  }
}