import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { ITKUpdateControllerCallback } from "../../../tinker/game-interfaces/TKUpdateControllerCallbackInterface";
import { SWeapon } from "../entities/SWeapon";

export interface SReloadAllWeaponsParameter {
  deltaTime: number;
}

export class SReloadAllWeapons implements ITKUpdateControllerCallback {

  id: string;
  weaponsRepository: SIdentifiableRepository<SWeapon>;

  constructor(newId: string, newWeaponsRepository: SIdentifiableRepository<SWeapon>) {
    this.id = newId;
    this.weaponsRepository = newWeaponsRepository;
  }

  async activate(parameter: object): Promise<void> {
    const params = parameter as SReloadAllWeaponsParameter;
    await this.onUpdate(params.deltaTime);
  }
  
  async onUpdate(deltaTime: number): Promise<void> {
    try{
    this.weaponsRepository.getAll().forEach((weapon: SWeapon) => {
      weapon.remainingTimeBeforeNextShot -= deltaTime;
      weapon.remainingTimeBeforeNextShot = Math.max(0, weapon.remainingTimeBeforeNextShot);
    });
    } catch (error) {
      console.error('Error reloading all weapons: ' + error);
    }
  }
}