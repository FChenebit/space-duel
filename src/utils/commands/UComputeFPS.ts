import { ITKUpdateControllerCallback } from "../../tinker/game-interfaces/TKUpdateControllerCallbackInterface";

export interface UComputeFPSParameter {
  deltaTime: number;
}


export class UComputeFPS implements ITKUpdateControllerCallback {

  elapsedTime: number;
  frameCount: number;
  constructor() {
    this.elapsedTime = 0;
    this.frameCount = 0;
  }

  async activate(parameter: object): Promise<void> {
    const params = parameter as UComputeFPSParameter;
    await this.onUpdate(params.deltaTime);
  }


  onUpdate(deltaTime: number): void {
    this.frameCount++;
    this.elapsedTime+= deltaTime;
    if(this.elapsedTime > 10000) {
      const fps = (this.frameCount * 1000)/this.elapsedTime;      
      console.log('fps ' + fps);
      this.elapsedTime = 0;
      this.frameCount = 0;
    }
  }
  
}