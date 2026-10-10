import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { ITKUpdateControllerCallback } from "../../../tinker/game-interfaces/TKUpdateControllerCallbackInterface";
import { SFireWeapon } from "../../weapon/commands/SFireWeapon";
import { SEnemyShip } from "../entities/SEnemyShip";


export class SFireEnemyShip implements ITKUpdateControllerCallback {

  id: string;
  enemysShipRepository: SIdentifiableRepository<SEnemyShip>;

  constructor(newId: string, newEnemysShipRepository: SIdentifiableRepository<SEnemyShip>) {
    this.id = newId;
    this.enemysShipRepository = newEnemysShipRepository;
  }
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async activate(_parameter: object): Promise<void> {
    await this.onUpdate();
  }
  
  async onUpdate(): Promise<void> {
    this.enemysShipRepository.getAll().forEach((enemyShip: SEnemyShip) => {
      enemyShip.fireWeaponsCommands.forEach((fireWeaponCommand: SFireWeapon) => {
        //console.log("firing weapon for enemy ship " + enemyShip.id);
        fireWeaponCommand.execute();
        //console.log("after firing weapon for enemy ship " + enemyShip.id);
      });
    });
    //console.log("after firing weapons for enemy ships, remaining " + this.enemysShipRepository.count());
  }
}