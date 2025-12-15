import { ITKControllerCallback } from "../game-interfaces/TKControllerCallbackInterface";

export class TKController<TCallback extends ITKControllerCallback> {
  private callbacks : TCallback[]
  
  constructor() {
    this.callbacks = [];
  }

  addCallback(newCallback: TCallback): void {
    this.callbacks.push(newCallback);
  }

  countCallbacks() : number {
    return this.callbacks.length;
  }
  
  async activate(parameter:object): Promise<void> {
    await Promise.all(this.callbacks.map(async (callback) => {    
      await callback.activate(parameter);
    }));
  }

  
}