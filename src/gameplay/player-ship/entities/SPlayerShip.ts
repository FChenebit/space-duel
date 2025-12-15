import { ISMovingObject } from "../../../core/ports/ISMovingObject";
import { SWeapon } from "../../weapon/entities/SWeapon";

export class SPlayerShip implements ISMovingObject {
  x : number;
  y: number;
  representationId : string;
  rotation: number;
  speed: number;
  steering: number;
  laserWeapon: SWeapon;
  missileWeapon: SWeapon;
  mineWeapon: SWeapon;
  
  constructor(initialX: number, initialY: number, newRepresentationId: string, initialRotation: number,
      newSpeed : number, newLaserWeapon: SWeapon, newMissileWeapon: SWeapon, newMineWeapon: SWeapon) {
    this.x = initialX;
    this.y = initialY;
    this.rotation = initialRotation;
    this.steering = 0;
    this.representationId = newRepresentationId;
    this.speed = newSpeed;
    this.laserWeapon = newLaserWeapon;
    this.missileWeapon = newMissileWeapon;
    this.mineWeapon = newMineWeapon;
  }

}