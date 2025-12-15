import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { IIDGenerator } from "../../../core/ports/IIDGenerator";
import { ITKKeyboardControllerCallback } from "../../../tinker/game-interfaces/TKKeyboarControllerCallbackInterface";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { SProjectile } from "../../projectile/entity/SProjectile";
import { SFireWeapon } from "../../weapon/commands/SFireWeapon";
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
  fireLaser: SFireWeapon;
  fireMissile: SFireWeapon;
  fireMine: SFireWeapon;

  constructor(newIdGenerator: IIDGenerator, newSpriteManager: ITKSpriteManager, 
          newPlayerShipRepository: SPlayerShipRepository, newProjectileRepository: SIdentifiableRepository<SProjectile>) {
    this.idGenerator = newIdGenerator;
    this.spriteManager = newSpriteManager;
    this.playerShip = newPlayerShipRepository.getPlayerShip();
    this.projectileRepository = newProjectileRepository;
    this.fireLaser = new SFireWeapon(newIdGenerator, newSpriteManager, newProjectileRepository, this.playerShip.laserWeapon, newPlayerShipRepository.getPlayerShip());
    this.fireMissile = new SFireWeapon(newIdGenerator, newSpriteManager, newProjectileRepository, this.playerShip.missileWeapon, newPlayerShipRepository.getPlayerShip());
    this.fireMine = new SFireWeapon(newIdGenerator, newSpriteManager, newProjectileRepository, this.playerShip.mineWeapon, newPlayerShipRepository.getPlayerShip());

  }
  async activate(parameter: object): Promise<void> {
    const params = parameter as SPlayerFireWeaponParameter;
    this.onKeyDown(params.code);
  }
  
  onKeyDown(code: string): void {
    console.log('code : in player fire weapon : ' + code + 'expected : KeyW');
    if(code === 'KeyW') {
      this.fireLaser.execute();      
    }
    if (code === 'KeyE') {
      this.fireMissile.execute();
    }
    if (code === 'KeyR') {
      this.fireMine.execute();
    }
  }
}