import { TKController } from "../../../tinker/controllers/TKController";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { ITKUpdateControllerCallback } from "../../../tinker/game-interfaces/TKUpdateControllerCallbackInterface";
import { SQuitGame } from "./SQuitGame";

const GAME_OVER_TIME = 5000;

export interface SGameOverParameter {
  deltaTime: number;
}

export class SGameOver implements ITKUpdateControllerCallback {

  private remainingTime:number;
  private readonly quitgame : SQuitGame;
  private readonly spriteManager : ITKSpriteManager;
  private gameW: number;
  private gameH: number;
  private updateController: TKController<ITKUpdateControllerCallback>;
  private alreadyLaunched : boolean;

  constructor(newQuitGame : SQuitGame, newSpriteManager:ITKSpriteManager, newGameW:number, newGameH:number,
        newUpdateControler:TKController<ITKUpdateControllerCallback>) {
    this.spriteManager = newSpriteManager;
    this.remainingTime = GAME_OVER_TIME;
    this.quitgame = newQuitGame;    
    this.gameW = newGameW;
    this.gameH = newGameH;
    this.updateController = newUpdateControler;
    this.alreadyLaunched = false;
  }

  launch() {
    if(!this.alreadyLaunched) {
      console.log('launch remaining time ' + this.remainingTime.toString());
      // @ts-expect-error unused parameter
      const _textId = this.spriteManager.newText('GAME OVER',this.gameW/2, this.gameH/2, {
        fontSize: '128px',
        color: '#ff0000'
      });
      this.updateController.addCallback(this);
      this.alreadyLaunched = true;
    }
  }

  async activate(parameter: object): Promise<void> {
    const params = parameter as SGameOverParameter;
    await this.onUpdate(params.deltaTime);
  }
    
  async onUpdate(deltaTime: number): Promise<void> {
    console.log('delta time ' + deltaTime.toString() + ' this.remaining time ' + this.remainingTime.toString());
    this.remainingTime -= deltaTime;
    if(this.remainingTime < 0) {
      console.log('quite game activate');
      this.quitgame.activate();
    }
  }
  

}