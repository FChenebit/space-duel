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
import { SSpeedBar } from "../entities/SSpeedBar";

export const PLAYER_SHIP_SIZE = 30;

export class SInitPlayerShip implements ITKInitControllerCallback {

  private readonly idGenerator: IIDGenerator;
  private readonly playerShipRepository : SPlayerShipRepository;
  private readonly sceneWidth: number;
  private readonly sceneHeight: number;
  private readonly spriteManager: ITKSpriteManager;
  private readonly weaponRepository: SIdentifiableRepository<SWeapon>;

  constructor(newIdGenerator: IIDGenerator, newPlayerShipRepository: SPlayerShipRepository,
      newSceneWidth: number, newSceneHeight: number,
      newSpriteManager: ITKSpriteManager, newWeaponRepository: SIdentifiableRepository<SWeapon>) {
    this.idGenerator = newIdGenerator;
    this.playerShipRepository = newPlayerShipRepository;
    this.sceneWidth = newSceneWidth;
    this.sceneHeight = newSceneHeight;
    this.spriteManager = newSpriteManager;
    this.weaponRepository = newWeaponRepository;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async activate(_parameter: object): Promise<void> {
    await this.onInit();
  }

  async onInit(): Promise<void> {
    const newRepresentationID = this.spriteManager.newSprite('PlayerShip',this.sceneWidth/2,this.sceneHeight/2,PLAYER_SHIP_SIZE,PLAYER_SHIP_SIZE);
    const laser = new SWeapon(this.idGenerator.generate(), 100, 20000, 1000, 200, SProjectileTypeEnum.LASER, SFactionTypeEnum.PLAYER);
    const missile = new SWeapon(this.idGenerator.generate(), 100, 20000, 2000, 200, SProjectileTypeEnum.MISSILE, SFactionTypeEnum.PLAYER);
    const mine = new SWeapon(this.idGenerator.generate(), 100, 20000, 5000, 200, SProjectileTypeEnum.MINE, SFactionTypeEnum.PLAYER);
    this.weaponRepository.add(laser);
    this.weaponRepository.add(missile);
    this.weaponRepository.add(mine);
    const newPlayerShip = new SPlayerShip(0, 0, newRepresentationID,0,0,laser,missile,mine);
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