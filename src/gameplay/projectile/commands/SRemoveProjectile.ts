import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { SProjectile } from "../entity/SProjectile";

export class SRemoveProjectile {
  projectileRepository: SIdentifiableRepository<SProjectile>;
  spriteManager: ITKSpriteManager;
  constructor(newProjectileRepository: SIdentifiableRepository<SProjectile>, newSpriteManager: ITKSpriteManager) {
    this.projectileRepository = newProjectileRepository;
    this.spriteManager = newSpriteManager;
  }

  removeProjectile(projectile: SProjectile) {
    this.projectileRepository.remove(projectile.id);
    this.spriteManager.removeRepresentation(projectile.representationId);
  }
}