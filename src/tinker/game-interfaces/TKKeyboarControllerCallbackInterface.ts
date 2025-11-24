import { ITKControllerCallback } from "./TKControllerCallbackInterface";

export interface ITKKeyboardControllerCallback extends ITKControllerCallback {
  onKeyDown(code:string): void;
}