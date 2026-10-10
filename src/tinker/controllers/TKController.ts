import { SIdentifiableRepository } from "../../core/adapters/SIdentifiableRepository";
import { ITKControllerCallback } from "../game-interfaces/TKControllerCallbackInterface";

export class TKController<TCallback extends ITKControllerCallback> {
  private callbacks : SIdentifiableRepository<TCallback>
  
  constructor() {
    this.callbacks = new SIdentifiableRepository<TCallback>();
  }

  addCallback(newCallback: TCallback): void {
    this.callbacks.add(newCallback);
  }

  removeCallback(callBackToRemove: TCallback): void {
    this.callbacks.remove(callBackToRemove.id);
  }

  countCallbacks() : number {
    return this.callbacks.count();
  }
  
  async activate(parameter:object): Promise<void> {
    await Promise.all(this.callbacks.getAll().map(async (callback) => {    
      await callback.activate(parameter);
    }));
  }

  
}