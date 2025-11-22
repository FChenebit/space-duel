import { ITKControllerCallback } from "./TKControllerCallbackInterface";

export interface ITKInitControllerCallback extends ITKControllerCallback {
  onInit(): Promise<void>;
}