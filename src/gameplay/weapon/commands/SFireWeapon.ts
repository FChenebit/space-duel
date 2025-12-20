import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { IIDGenerator } from "../../../core/ports/IIDGenerator";
import { ISMovingObject } from "../../../core/ports/ISMovingObject";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { ProjectileCharachteristicsByType, SProjectile } from "../../projectile/entity/SProjectile";
import { SWeapon } from "../entities/SWeapon";

export class SFireWeapon {
  idGenerator: IIDGenerator;
  spriteManager: ITKSpriteManager;
  projectileRepository: SIdentifiableRepository<SProjectile>;
  weapon: SWeapon;
  firer: ISMovingObject;
  constructor(newIdGenerator: IIDGenerator, newSpriteManager: ITKSpriteManager,
       newProjectileRepository: SIdentifiableRepository<SProjectile>, newWeapon: SWeapon, newFirer: ISMovingObject) {
    this.idGenerator = newIdGenerator;
    this.spriteManager = newSpriteManager;
    this.projectileRepository = newProjectileRepository;
    this.weapon = newWeapon;
    this.firer = newFirer;
  }

  execute(): void {
    try{
    console.log("Firing weapon " + this.weapon.faction + " " + this.weapon.remainingTimeBeforeNextShot);

    if (this.weapon.remainingTimeBeforeNextShot <= 0) {
      console.log("Firing weapon : " + this.weapon.projectileType);
      const projectileCharachteristics = ProjectileCharachteristicsByType[this.weapon.projectileType];
      const newRepresentationId = this.spriteManager.newSprite(projectileCharachteristics.textureName, 0, 
        0, projectileCharachteristics.width, projectileCharachteristics.height, projectileCharachteristics.depth);
      const newId = this.idGenerator.generate();
      const newProjectile = new SProjectile(newId, this.firer.x, this.firer.y,newRepresentationId, this.weapon.projectileSpeed,
         this.firer.rotation,this.weapon.faction, this.weapon.projectileType);
      this.projectileRepository.add(newProjectile);
      console.log('After firing weapon: ' + this.projectileRepository.count()+ ' projectile id: ' + newProjectile.id);
      this.weapon.remainingTimeBeforeNextShot = this.weapon.cooldown;
    }
    } catch (error) {
      console.error('Error firing weapon: ' + error);
    }
  }
}
