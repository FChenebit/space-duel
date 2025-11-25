import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { ISPlayerShipMoveCallback } from "../../player-ship/interface/SPlayerShipMoveCallback";
import { SProjectile } from "../entity/SProjectile";
import { SRemoveProjectile } from "./SRemoveProjectile";

export class SDisplayProjectile implements ISPlayerShipMoveCallback {

  projectileRepository: SIdentifiableRepository<SProjectile>;
  spriteManager: ITKSpriteManager;
  sceneWidth: number;
  sceneHeight: number;
  removeProjectile: SRemoveProjectile;

  constructor(newProjectileRepository: SIdentifiableRepository<SProjectile>, newSpriteManager: ITKSpriteManager,
    newSceneWidth: number, newSceneHeight: number) {
    this.projectileRepository = newProjectileRepository;
    this.spriteManager = newSpriteManager;
    this.sceneWidth = newSceneWidth;
    this.sceneHeight = newSceneHeight;
    this.removeProjectile = new SRemoveProjectile(newProjectileRepository, newSpriteManager);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPlayerShipMove(newXPlayerShip: number, newYPlayerShip: number, _deltaX: number, _deltaY: number): void {
    const projectiles = this.projectileRepository.getAll();
    projectiles.forEach((projectile: SProjectile) => {
      const distanceX = projectile.x - newXPlayerShip;
      const distanceY = projectile.y - newYPlayerShip;      
      this.spriteManager.moveRepresentationToXY(projectile.representationId, this.sceneWidth/2 + distanceX, 
        this.sceneHeight/2 + distanceY);
      this.spriteManager.rotateRepresantationToAngle(projectile.representationId, projectile.rotation);
      const fullSceneCoordinate = this.spriteManager.getRepresentationFullSceneCoordinate(projectile.representationId);
      if (fullSceneCoordinate.x > (this.sceneWidth*1.5) || fullSceneCoordinate.x < (this.sceneWidth*-0.5) 
          || fullSceneCoordinate.y > (this.sceneHeight*1.5) || fullSceneCoordinate.y < (this.sceneHeight*-0.5)) {
        this.removeProjectile.removeProjectile(projectile);
      }
    });
  }
}