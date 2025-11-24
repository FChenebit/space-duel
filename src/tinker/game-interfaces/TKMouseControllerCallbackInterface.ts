import { ITKControllerCallback } from "./TKControllerCallbackInterface";

export interface ITKMouseControllerCallback extends ITKControllerCallback {
  onMouseMove(newMouseX:number, newMouseY:number): Promise<void>;
}