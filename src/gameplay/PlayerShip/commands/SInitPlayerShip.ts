import { ITKInitControllerCallback } from "../../../tinker/game-interfaces/TKInitControllerCallbackInterface";

export class SInitPlayerShip implements ITKInitControllerCallback {
  onInit(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  activate(_parameter: object): Promise<void> {
    return this.onInit();
  }
}