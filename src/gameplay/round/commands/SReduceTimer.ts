import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { ITKUpdateControllerCallback } from "../../../tinker/game-interfaces/TKUpdateControllerCallbackInterface";
import { SRoundRepository } from "../adapters/SRoundRepository";
import { SGameOver } from "./SGameOver";

export interface SReduceTimerParameter {
  deltaTime: number;
}


export class SReduceTimer implements ITKUpdateControllerCallback {

  private readonly roundRepositopry : SRoundRepository;
  private readonly spriteManager : ITKSpriteManager;
  private readonly gameOver : SGameOver;

  constructor(newSRoundRepository : SRoundRepository, newSpriteManager : ITKSpriteManager,
      newGameOver:SGameOver) {
    this.roundRepositopry = newSRoundRepository;
    this.spriteManager = newSpriteManager;
    this.gameOver = newGameOver;
  }

  async activate(parameter: object): Promise<void> {
    const params = parameter as SReduceTimerParameter;
    await this.onUpdate(params.deltaTime);
  }
  
  async onUpdate(deltaTime: number): Promise<void> {
    const curTimer = this.roundRepositopry.getRoundTimer();
    curTimer.remainingTime = curTimer.remainingTime - deltaTime;
    this.spriteManager.changeRepresentationText(this.roundRepositopry.getTimerTextId(),
      ('Temps restant : ' + (Math.trunc(curTimer.remainingTime/1000).toString())));
      if(curTimer.remainingTime < 0) {
        // attention, on launch à chaque tick. la protection contre launch multiple dans game over l'empêche 
        this.gameOver.launch();
      }
  }
}