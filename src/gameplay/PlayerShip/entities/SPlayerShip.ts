import { ISMovingObject } from "../../../core/ports/ISMovingObject";

export class SPlayerShip implements ISMovingObject {
  x : number;
  y: number;
  representationId : string;
  rotation: number;
  speed: number;
  steering: number;
  
  constructor(initialX: number, initialY: number, newRepresentationId: string, initialRotation: number,
      newSpeed : number) {
    this.x = initialX;
    this.y = initialY;
    this.rotation = initialRotation;
    this.steering = 0;
    this.representationId = newRepresentationId;
    this.speed = newSpeed;
  }

}