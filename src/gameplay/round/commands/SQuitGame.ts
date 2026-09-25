import { NavigateFunction } from "react-router-dom";

export class SQuitGame {
  private readonly navigate : NavigateFunction;
  constructor(newNavigate : NavigateFunction) {
    this.navigate = newNavigate;
  }

  activate():void {
    this.navigate('/',{});
  }
}