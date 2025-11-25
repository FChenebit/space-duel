import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { IIDGenerator } from "../../../core/ports/IIDGenerator";
import { ITKKeyboardControllerCallback } from "../../../tinker/game-interfaces/TKKeyboarControllerCallbackInterface";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { SProjectile, SProjectileTypeEnum } from "../../projectile/entity/SProjectile";
import { SPlayerShipRepository } from "../adapters/SPlayerShipRepository";
import { SPlayerShip } from "../entities/SPlayerShip";

export const PLAYER_PROJECTILE_SPEED = 150;
export const PLAYER_PROJECTILE_WIDTH = 3;
export const PLAYER_PROJECTILE_HEIGHT = 11;
export const PLAYER_PROJECTILE_DEPTH = 2;

export interface SPlayerFireWeaponParameter {
  code: string;
}

export class SPlayerFireWeapon implements ITKKeyboardControllerCallback {

  idGenerator: IIDGenerator;
  spriteManager: ITKSpriteManager;
  playerShip: SPlayerShip;
  projectileRepository: SIdentifiableRepository<SProjectile>;
  constructor(newIdGenerator: IIDGenerator, newSpriteManager: ITKSpriteManager, 
          newPlayerShipRepository: SPlayerShipRepository, newProjectileRepository: SIdentifiableRepository<SProjectile>) {
    this.idGenerator = newIdGenerator;
    this.spriteManager = newSpriteManager;
    this.playerShip = newPlayerShipRepository.getPlayerShip();
    this.projectileRepository = newProjectileRepository;
  }
  async activate(parameter: object): Promise<void> {
    const params = parameter as SPlayerFireWeaponParameter;
    this.onKeyDown(params.code);
  }
  
  onKeyDown(code: string): void {
    console.log('code : in player fire weapon : ' + code + 'expected : KeyW');
    if(code === 'KeyW') {
     
      const newRepresentationId = this.spriteManager.newSprite('Projectile', 0, 
        0, PLAYER_PROJECTILE_WIDTH, PLAYER_PROJECTILE_HEIGHT, PLAYER_PROJECTILE_DEPTH);
      const newId = this.idGenerator.generate();
      const newProjectile = new SProjectile(newId, this.playerShip.x, this.playerShip.y,newRepresentationId, PLAYER_PROJECTILE_SPEED, this.playerShip.rotation, SProjectileTypeEnum.PLAYER);
      this.projectileRepository.add(newProjectile);
      
    }
  }
}