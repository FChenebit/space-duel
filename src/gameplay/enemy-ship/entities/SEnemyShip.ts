
import { IIdentifiable } from "../../../core/ports/IIdentifiable";
import { ISMovingObject } from "../../../core/ports/ISMovingObject";
import { SFireWeapon } from "../../weapon/commands/SFireWeapon";

export const SEnemyShipTypeEnum = {
  DRONE: 'DRONE',
  PREY: 'PREY',
  HUNTER: 'HUNTER'
} as const;
export type SEnemyShipType = (typeof SEnemyShipTypeEnum)[keyof typeof SEnemyShipTypeEnum];

export const ENEMYSHIP_WIDTH = 30;
export const ENEMYSHIP_HEIGHT = 30;

export class SEnemyShip implements ISMovingObject, IIdentifiable {
  id: string;
  x : number;
  y: number;
  representationId : string;
  speed: number;
  type: SEnemyShipType;
  rotation: number;
  steering: number;
  fireWeaponsCommands!: SFireWeapon[];
  
  constructor(newId : string, initialX: number, initialY: number, newRepresentationId: string, 
        newSpeed : number, newType : SEnemyShipType, newSteering : number) {
    this.id = newId;
    this.x = initialX;
    this.y = initialY;
    this.representationId = newRepresentationId;
    this.speed = newSpeed;
    this.type = newType;
    this.rotation = 0;
    this.steering = newSteering;
    //this.fireWeaponsCommands = newWeapons.map((weapon: SWeapon) => new SFireWeapon(idGenerator, spriteManager, projectileRepository, weapon, this));
    this.fireWeaponsCommands = [];
  }

}