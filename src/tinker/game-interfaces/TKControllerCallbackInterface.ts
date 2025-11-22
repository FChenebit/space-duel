export interface ITKControllerCallback {
  activate(parameter:object): Promise<void>;
}