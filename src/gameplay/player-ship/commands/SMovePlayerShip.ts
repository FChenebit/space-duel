import { SMoveObject } from "../../../core/usecase/SMoveObject";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { ITKUpdateControllerCallback } from "../../../tinker/game-interfaces/TKUpdateControllerCallbackInterface";
import { SPlayerShipRepository } from "../adapters/SPlayerShipRepository";
import { SPlayerShip } from "../entities/SPlayerShip";
import { ISPlayerShipMoveCallback } from "../interface/SPlayerShipMoveCallback";

export interface SMovePlayerShipParameter {
  deltaTime: number;
}

export class SMovePlayerShip implements ITKUpdateControllerCallback {

  playerShip: SPlayerShip;
  elapsedTime: number;
  playerShipMoveCallbacks: ISPlayerShipMoveCallback[];
  moveShip: SMoveObject;
  spriteManager: ITKSpriteManager;
  constructor(newPlayerShipRepository: SPlayerShipRepository,
      newCallbacks:ISPlayerShipMoveCallback[], newSpriteManager: ITKSpriteManager) {
    this.playerShip = newPlayerShipRepository.getPlayerShip();
    this.elapsedTime = 0;
    this.playerShipMoveCallbacks = newCallbacks;
    this.moveShip = new SMoveObject();
    this.spriteManager = newSpriteManager;
  }
  async activate(parameter: object): Promise<void> {
    const params = parameter as SMovePlayerShipParameter;
    await this.onUpdate(params.deltaTime);
  }

  async onUpdate(deltaTime: number): Promise<void> {
    this.playerShip.rotation += this.playerShip.steering*deltaTime/1000;
    this.spriteManager.rotateRepresantationToAngle(this.playerShip.representationId, this.playerShip.rotation);

    const {deltaX, deltaY} = this.moveShip.moveObject(this.playerShip, deltaTime);

    this.playerShipMoveCallbacks.forEach((callback) => {
      callback.onPlayerShipMove(this.playerShip.x, this.playerShip.y, deltaX, deltaY);
    })

    this.elapsedTime += deltaTime;
    if(this.elapsedTime > 10000) {
      this.elapsedTime = 0;
      console.log('player ship x ' + this.playerShip.x + ' player ship y ' + this.playerShip.y + ' speed ' + this.playerShip.speed + ' rotation ' + this.playerShip.rotation );
    }
  }
  
}