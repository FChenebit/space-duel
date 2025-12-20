/* eslint-disable @typescript-eslint/no-unused-vars */
import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { IIDGenerator } from "../../../core/ports/IIDGenerator";
import { SFactionTypeEnum } from "../../../core/type/SFaction";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { SProjectile, SProjectileTypeEnum } from "../../projectile/entity/SProjectile";
import { SFireWeapon } from "../../weapon/commands/SFireWeapon";
import { SWeapon } from "../../weapon/entities/SWeapon";
import { ENEMYSHIP_HEIGHT, ENEMYSHIP_WIDTH, SEnemyShip, SEnemyShipType } from "../entities/SEnemyShip";

export class SNewEnemyShip {
  enemyShipRepository: SIdentifiableRepository<SEnemyShip>;
  idGenerator: IIDGenerator;
  spriteManager: ITKSpriteManager;
  private readonly weaponRepository: SIdentifiableRepository<SWeapon>;
  private readonly projectileRepository: SIdentifiableRepository<SProjectile>;

  constructor(newEnemyShipRepository: SIdentifiableRepository<SEnemyShip>, newIdGenerator: IIDGenerator, 
      newSpriteManager: ITKSpriteManager, newWeaponRepository: SIdentifiableRepository<SWeapon>,
       newProjectileRepository: SIdentifiableRepository<SProjectile>) {
    this.enemyShipRepository = newEnemyShipRepository;
    this.idGenerator = newIdGenerator;
    this.spriteManager = newSpriteManager;
    this.weaponRepository = newWeaponRepository;
    this.projectileRepository = newProjectileRepository;
  }

  execute(initialX: number, initialY: number, newSpeed : number, newSteering: number,newType : SEnemyShipType) {

    const newRepresentationId = this.spriteManager.newSprite(newType.toString(), initialX, initialY, ENEMYSHIP_WIDTH, ENEMYSHIP_HEIGHT);
    const newId = this.idGenerator.generate();
    const laser = new SWeapon(this.idGenerator.generate(), 100, 20000, 1000, 200, SProjectileTypeEnum.LASER, SFactionTypeEnum.ENEMY);
    const missile = new SWeapon(this.idGenerator.generate(), 100, 20000, 2000, 200, SProjectileTypeEnum.MISSILE, SFactionTypeEnum.ENEMY);
    const mine = new SWeapon(this.idGenerator.generate(), 100, 20000, 5000, 200, SProjectileTypeEnum.MINE, SFactionTypeEnum.ENEMY);
    this.weaponRepository.add(laser);
    this.weaponRepository.add(missile);
    this.weaponRepository.add(mine);

    const newEnemyShip = new SEnemyShip(newId, initialX, initialY, newRepresentationId, newSpeed, newType,newSteering);
    this.enemyShipRepository.add(newEnemyShip);
    
    try{
      const fireMissileCommand = new SFireWeapon(this.idGenerator, this.spriteManager, this.projectileRepository, missile, newEnemyShip);
      newEnemyShip.fireWeaponsCommands.push(fireMissileCommand);
      /* Future: add mine and laser commands when needed
      const fireMineCommand = new SFireWeapon(this.idGenerator, this.spriteManager, this.projectileRepository, mine, newEnemyShip);
      const fireLaserCommand = new SFireWeapon(this.idGenerator, this.spriteManager, this.projectileRepository, laser, newEnemyShip);
      newEnemyShip.fireWeaponsCommands.push(fireMineCommand);
      newEnemyShip.fireWeaponsCommands.push(fireLaserCommand);
      */
    } catch (error) {
      console.error('Error creating enemy ship: ' + error);
    }
  }
}