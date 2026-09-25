import { STimer } from "../entities/STimer";

export class SRoundRepository {
  private roundTimer!: STimer;
  private timerTextId!: string;
  
  setRoundTimer(newTimer:STimer) {
    this.roundTimer = newTimer;
  }

  getRoundTimer():STimer {
    return this.roundTimer;
  }

  setTimerTextId(newTimerTextId:string){
    this.timerTextId = newTimerTextId
  } 

  getTimerTextId():string {
    return this.timerTextId;
  }
}