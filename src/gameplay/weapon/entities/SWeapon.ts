import { IIdentifiable } from "../../../core/ports/IIdentifiable";
import { SFactionType } from "../../../core/type/SFaction";
import { SProjectileType } from "../../projectile/entity/SProjectile";

export class SWeapon implements IIdentifiable {
  public readonly id: string;
  public readonly damage: number;
  public readonly range: number;
  public readonly cooldown: number;
  public remainingTimeBeforeNextShot: number;
  public readonly projectileSpeed: number;
  public readonly projectileType: SProjectileType;
  public readonly faction: SFactionType;
  constructor(
    newId: string,
     newDamage: number,
     newRange: number,
     newCooldown: number,
     newProjectileSpeed: number,
     newProjectileType: SProjectileType,
     newFaction: SFactionType,
  ) {
    this.id = newId;
    this.damage = newDamage;
    this.range = newRange;
    this.cooldown = newCooldown;
    this.remainingTimeBeforeNextShot = 0;
    this.projectileSpeed = newProjectileSpeed;
    this.projectileType = newProjectileType;
    this.faction = newFaction;
  }
}