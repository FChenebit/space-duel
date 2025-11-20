import type { ITKInitControllerCallback } from '../game-interfaces/TKInitControllerCallbackInterface';

export class TKInitController {

  private callbacks : ITKInitControllerCallback[]
  
  constructor() {
    this.callbacks = [];
  }

  addCallback(newCallback: ITKInitControllerCallback): void {
    this.callbacks.push(newCallback);
  }

  countCallback() : number {
    return this.callbacks.length;
  }

  async activate(): Promise<void> {
    await Promise.all(this.callbacks.map(async (callback) => {
      await callback.onInit();
    }));
  }
}