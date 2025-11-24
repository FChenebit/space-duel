import { ITKMouseControllerCallback } from "../../../tinker/game-interfaces/TKMouseControllerCallbackInterface";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { SPlayerShipRepository } from "../adapters/SPlayerShipRepository";
import { SNavigationBar } from "../entities/SNavigationBar";
import { SPlayerShip } from "../entities/SPlayerShip";

export const MAX_PLAYER_SHIP_STEERING = 0.5;

export interface SSteerPlayerShipParameter {
  x: number;
  y: number;
}

export class SSteerPlayerShip implements ITKMouseControllerCallback {

  sceneWidth: number;
  sceneHeight: number;
  spriteManager: ITKSpriteManager;
  playerShip: SPlayerShip;
  navigationBar: SNavigationBar;

  constructor(newPlayerShipRepository: SPlayerShipRepository, newSceneWidth:number, newSceneHeight:number,newSpriteManager : ITKSpriteManager) {
    this.playerShip = newPlayerShipRepository.getPlayerShip();
    this.navigationBar = newPlayerShipRepository.getNavigationBar();
    this.sceneWidth = newSceneWidth;
    this.sceneHeight = newSceneHeight;
    this.spriteManager = newSpriteManager;
  }

  async activate(parameter: object): Promise<void> {
    const params = parameter as SSteerPlayerShipParameter;
    await this.onMouseMove(params.x, params.y);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onMouseMove(newMouseX:number, _newMouseY:number): Promise<void> {
    const reducedX = Math.min(Math.max(newMouseX, this.sceneWidth / 4), this.sceneWidth * 3 / 4)-this.sceneWidth/2;
    this.playerShip.steering = (reducedX/(this.sceneWidth/4)) * MAX_PLAYER_SHIP_STEERING;
    const fullCircleCoordinnate = this.spriteManager.getRepresentationFullSceneCoordinate(this.navigationBar.circleRepresentationId);
    this.spriteManager.moveRepresentationToXY(
      this.navigationBar.circleRepresentationId,
      this.sceneWidth/2 +  reducedX,
      fullCircleCoordinnate.y
    );
  }
}