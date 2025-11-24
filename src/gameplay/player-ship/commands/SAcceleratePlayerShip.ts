import { ITKKeyboardControllerCallback } from "../../../tinker/game-interfaces/TKKeyboarControllerCallbackInterface";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { SPlayerShipRepository } from "../adapters/SPlayerShipRepository";
import { SPlayerShip } from "../entities/SPlayerShip";
import { SSpeedBar } from "../entities/SSpeedBar";


export const MAX_PLAYER_SHIP_SPEED = 150;
export const MIN_PLAYER_SHIP_SPEED = 0;
export const PLAYER_SHIP_ACCELERATION = 5;

export interface SAcceleratePlayerShipParameter {
  code: string;
}

export class SAcceleratePlayerShip implements ITKKeyboardControllerCallback {
  playerShip: SPlayerShip;
  speedBar: SSpeedBar;
  spriteManager: ITKSpriteManager;
  sceneHeight: number;

  constructor(newPlayerShipRepository: SPlayerShipRepository, newSceneHeight: number, 
      newSpriteManager: ITKSpriteManager) {
    this.playerShip = newPlayerShipRepository.getPlayerShip();
    this.speedBar = newPlayerShipRepository.getSpeedBar();
    this.spriteManager = newSpriteManager;
    this.sceneHeight = newSceneHeight;
  }

  async activate(parameter: object): Promise<void> {
    const params = parameter as SAcceleratePlayerShipParameter;
    await this.onKeyDown(params.code);
  }

  onKeyDown(code: string): void {
    if(code === 'KeyQ') {
      this.playerShip.speed+=PLAYER_SHIP_ACCELERATION;
    }
    if(code === 'KeyA') {
      this.playerShip.speed-=PLAYER_SHIP_ACCELERATION;
    }

    this.playerShip.speed = Math.max(MIN_PLAYER_SHIP_SPEED,
      Math.min(MAX_PLAYER_SHIP_SPEED,this.playerShip.speed));
    
    const fullCircleCoordinnate = this.spriteManager.getRepresentationFullSceneCoordinate(this.speedBar.circleRepresentationId);
    this.spriteManager.moveRepresentationToXY(
      this.speedBar.circleRepresentationId,
      fullCircleCoordinnate.x,
      this.sceneHeight*0.25 + (MAX_PLAYER_SHIP_SPEED - this.playerShip.speed)*(this.sceneHeight*0.5)/MAX_PLAYER_SHIP_SPEED      
    );

  }

  
}