import { IIdentifiable } from "../../../core/ports/IIdentifiable";
import { ISMovingObject } from "../../../core/ports/ISMovingObject";

export const SProjectileTypeEnum = {
  PLAYER: 'PLAYER',
  ENEMY: 'ENEMY',
} as const;
export type SProjectileType = (typeof SProjectileTypeEnum)[keyof typeof SProjectileTypeEnum];


export class SProjectile implements ISMovingObject, IIdentifiable {
  id: string;
  x: number;
  y: number;
  representationId: string;
  speed: number;
  rotation: number;
  type: SProjectileType;
  constructor(newId: string, initialX: number, initialY: number, newRepresentationId: string, initialSpeed: number, initialRotation: number, newType: SProjectileType) {
    this.id = newId;
    this.x = initialX;
    this.y = initialY;
    this.representationId = newRepresentationId;
    this.speed = initialSpeed;
    this.rotation = initialRotation;
    this.type = newType;
  }
}
