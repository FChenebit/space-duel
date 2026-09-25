import { ITKInitControllerCallback } from "../../../tinker/game-interfaces/TKInitControllerCallbackInterface";
import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { SRoundRepository } from "../adapters/SRoundRepository";
import { STimer } from "../entities/STimer";

//const ROUND_DURATION = 180000; // 3 min in ms
const ROUND_DURATION = 10000; // 3 min in ms
const TIMER_DISPLAY_Y = 50;

export class SInitRound implements ITKInitControllerCallback {

  private readonly roundRepository : SRoundRepository;
  private readonly spriteManager : ITKSpriteManager;
  private readonly gameWidth: number;

  constructor(newRoundRepository : SRoundRepository,
    newSpriteManager: ITKSpriteManager, newGameWidth : number) {
    this.roundRepository = newRoundRepository;
    this.spriteManager = newSpriteManager;
    this.gameWidth = newGameWidth;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async activate(_parameter: object): Promise<void> {
    await this.onInit();
  }

  async onInit(): Promise<void> {
    const newTimer = new STimer(ROUND_DURATION);
    const timeToDisplay = Math.trunc(newTimer.remainingTime / 1000);
    const newTimerTextId = this.spriteManager.newText(timeToDisplay.toString(),this.gameWidth/2,TIMER_DISPLAY_Y,{
      fontSize: '32px',
      color: '#ffffff'
    })
    this.roundRepository.setRoundTimer(newTimer);
    this.roundRepository.setTimerTextId(newTimerTextId);
  }

}