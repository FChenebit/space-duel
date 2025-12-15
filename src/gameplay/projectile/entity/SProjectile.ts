import { IIdentifiable } from "../../../core/ports/IIdentifiable";
import { ISMovingObject } from "../../../core/ports/ISMovingObject";
import { SFactionType } from "../../../core/type/SFaction";

export const SProjectileTypeEnum = {
  LASER: 'LASER',
  MISSILE: 'MISSILE',
  MINE: 'MINE',
} as const;
export type SProjectileType = (typeof SProjectileTypeEnum)[keyof typeof SProjectileTypeEnum];

export type SProjectileCharachteristics = {
  textureName: string;
  width: number;
  height: number;
  depth: number;
}

export const ProjectileCharachteristicsByType: Record<SProjectileType, SProjectileCharachteristics> = {
   [SProjectileTypeEnum.LASER]: {
    textureName: 'Laser',
    width: 16,
    height: 9,
    depth: 2,
  },
  [SProjectileTypeEnum.MISSILE]: {
    textureName: 'Missile',
    width: 3,
    height: 11,
    depth: 2,
  },
  [SProjectileTypeEnum.MINE]: {
    textureName: 'Mine',
    width: 11,
    height: 9,
    depth: 2,
  },
};

export class SProjectile implements ISMovingObject, IIdentifiable {
  id: string;
  x: number;
  y: number;
  representationId: string;
  speed: number;
  rotation: number;
  faction: SFactionType;
  type: SProjectileType;

  constructor(newId: string, initialX: number, initialY: number, newRepresentationId: string,
     initialSpeed: number, initialRotation: number, newFaction: SFactionType, newType: SProjectileType) {
    this.id = newId;
    this.x = initialX;
    this.y = initialY;
    this.representationId = newRepresentationId;
    this.speed = initialSpeed;
    this.rotation = initialRotation;
    this.faction = newFaction;
    this.type = newType;
  }
}
