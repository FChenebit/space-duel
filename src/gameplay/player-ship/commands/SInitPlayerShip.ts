import type { ITKInitControllerCallback } from "../../../tinker/game-interfaces/TKInitControllerCallbackInterface";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { SPlayerShipRepository } from '../adapters/SPlayerShipRepository';
import { SNavigationBar } from "../entities/SNavigationBar";
import { SPlayerShip } from '../entities/SPlayerShip'
import { SSpeedBar } from "../entities/SSpeedBar";

export const PLAYER_SHIP_SIZE = 30;

export class SInitPlayerShip implements ITKInitControllerCallback {

  private readonly playerShipRepository : SPlayerShipRepository;
  private readonly sceneWidth: number;
  private readonly sceneHeight: number;
  private readonly spriteManager: ITKSpriteManager;

  constructor(newPlayerShipRepository: SPlayerShipRepository,
      newSceneWidth: number, newSceneHeight: number,
      newSpriteManager: ITKSpriteManager) {
    this.playerShipRepository = newPlayerShipRepository;
    this.sceneWidth = newSceneWidth;
    this.sceneHeight = newSceneHeight;
    this.spriteManager = newSpriteManager;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async activate(_parameter: object): Promise<void> {
    await this.onInit();
  }

  async onInit(): Promise<void> {
    const newRepresentationID = this.spriteManager.newSprite('PlayerShip',this.sceneWidth/2,this.sceneHeight/2,PLAYER_SHIP_SIZE,PLAYER_SHIP_SIZE);
    const newPlayerShip = new SPlayerShip(0, 0, newRepresentationID,0,0);
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