import { ITKControllerCallback } from "./TKControllerCallbackInterface";

export interface ITKUpdateControllerCallback extends ITKControllerCallback {
  onUpdate(deltaTime:number) : void;
}