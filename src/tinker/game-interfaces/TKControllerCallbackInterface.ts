import { IIdentifiable } from "../../core/ports/IIdentifiable";

export interface ITKControllerCallback extends IIdentifiable {
  activate(parameter:object): Promise<void>;
}