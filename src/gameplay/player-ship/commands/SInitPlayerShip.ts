import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { IIDGenerator } from "../../../core/ports/IIDGenerator";
import { SFactionTypeEnum } from "../../../core/type/SFaction";
import type { ITKInitControllerCallback } from "../../../tinker/game-interfaces/TKInitControllerCallbackInterface";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { SProjectileTypeEnum } from "../../projectile/entity/SProjectile";
import { SWeapon } from "../../weapon/entities/SWeapon";
import { SPlayerShipRepository } from '../adapters/SPlayerShipRepository';
import { SNavigationBar } from "../entities/SNavigationBar";
import { SPlayerShip } from '../entities/SPlayerShip'
import { SPlayerShipEnhancement } from "../entities/SPlayerShipEnhancement";
import { SSpeedBar } from "../entities/SSpeedBar";

export const PLAYER_SHIP_SIZE = 30;
const LASER_RANGE = 20000;
const LASER_COOLDOWN = 2000;
const LASER_SPEED = 200;
const MISSILE_RANGE = 25000;
const MISSILE_COOLDOWN = 3000;
const MISSILE_SPEED = 300;
const LANDMINE_RANGE = 15000;
const LANDMINE_COOLDOWN = 4000;
const LANDMINE_SPEED = -50;
const MAX_PLAYER_SHIP_STEERING = 0.5
const PLAYER_SHIP_ACCELERATION = 5;
const MAX_PLAYER_SHIP_SPEED = 150;

export class SInitPlayerShip implements ITKInitControllerCallback {

  private readonly idGenerator: IIDGenerator;
  private readonly playerShipRepository : SPlayerShipRepository;
  private readonly sceneWidth: number;
  private readonly sceneHeight: number;
  private readonly spriteManager: ITKSpriteManager;
  private readonly weaponRepository: SIdentifiableRepository<SWeapon>;
  private readonly playerShipEnhancement: SPlayerShipEnhancement

  constructor(newIdGenerator: IIDGenerator, newPlayerShipRepository: SPlayerShipRepository,
      newSceneWidth: number, newSceneHeight: number,
      newSpriteManager: ITKSpriteManager, newWeaponRepository: SIdentifiableRepository<SWeapon>,
      newPlayerShipEnhancement: SPlayerShipEnhancement) {
    this.idGenerator = newIdGenerator;
    this.playerShipRepository = newPlayerShipRepository;
    this.sceneWidth = newSceneWidth;
    this.sceneHeight = newSceneHeight;
    this.spriteManager = newSpriteManager;
    this.weaponRepository = newWeaponRepository;
    this.playerShipEnhancement = newPlayerShipEnhancement;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async activate(_parameter: object): Promise<void> {
    await this.onInit();
  }

  async onInit(): Promise<void> {
    const newRepresentationID = this.spriteManager.newSprite('PlayerShip',this.sceneWidth/2,this.sceneHeight/2,
        PLAYER_SHIP_SIZE,PLAYER_SHIP_SIZE);
    const laser = new SWeapon(this.idGenerator.generate(), 100, LASER_RANGE+this.playerShipEnhancement.laserRange,
     LASER_COOLDOWN+this.playerShipEnhancement.laserCooldown, LASER_SPEED+this.playerShipEnhancement.laserSpeed,
      SProjectileTypeEnum.LASER, SFactionTypeEnum.PLAYER);
    const missile = new SWeapon(this.idGenerator.generate(), 100, MISSILE_RANGE+this.playerShipEnhancement.missileRange,
     MISSILE_COOLDOWN+this.playerShipEnhancement.missileCooldown, MISSILE_SPEED+this.playerShipEnhancement.missileSpeed,
      SProjectileTypeEnum.MISSILE, SFactionTypeEnum.PLAYER);
    const mine = new SWeapon(this.idGenerator.generate(), 100, LANDMINE_RANGE+this.playerShipEnhancement.landmineRange,
     LANDMINE_COOLDOWN+this.playerShipEnhancement.landmineCooldown, LANDMINE_SPEED+this.playerShipEnhancement.landmineSpeed,
      SProjectileTypeEnum.MINE, SFactionTypeEnum.PLAYER);
    this.weaponRepository.add(laser);
    this.weaponRepository.add(missile);
    this.weaponRepository.add(mine);
    const newPlayerShip = new SPlayerShip(0, 0, newRepresentationID,0,0,
      MAX_PLAYER_SHIP_STEERING+this.playerShipEnhancement.steering,
      PLAYER_SHIP_ACCELERATION+this.playerShipEnhancement.acceleration,
      MAX_PLAYER_SHIP_SPEED+this.playerShipEnhancement.maxSpeed,
      laser,missile,mine);
    this.playerShipRepository.setPlayerShip(newPlayerShip);
    const newCircleRepresentationID = this.spriteManager.newCircle(this.sceneWidth / 2, this.sceneHeight * 0.95, 15, 0xff0000);
    const newBarRepresentationId = this.spriteManager.newRectangle(this.sceneWidth / 2, this.sceneHeight * 0.95, this.sceneWidth / 2, 10, 5, 0xffff00);
    const newNavigationBar = new SNavigationBar(this.sceneWidth / 2, newBarRepresentationId, newCircleRepresentationID);
    this.playerShipRepository.setNavigationBar(newNavigationBar);
    const newVerticalCircleRepresentationID = this.spriteManager.newCircle(this.sceneWidth * 0.05, this.sceneHeight * 0.75, 15, 0xffff00);
    const newVerticalBarRepresentationId = this.spriteManager.newRectangle(this.sceneWidth * 0.05, this.sceneHeight /2, 10, this.sceneHeight/2, 5, 0xffff00);
    const newSpeedBar = new SSpeedBar(this.sceneHeight * 0.75, newVerticalBarRepresentationId, newVerticalCircleRepresentationID);
    this.playerShipRepository.setSpeedBar(newSpeedBar);
  }
}