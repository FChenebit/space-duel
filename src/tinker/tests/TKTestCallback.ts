import { ITKControllerCallback } from "../game-interfaces/TKControllerCallbackInterface";
import { TKTestCallbackParameter } from "./TKTestCallbackParameter";

export class TKTestCallback implements ITKControllerCallback {

  public onTest(testCallbackParameter: TKTestCallbackParameter) {
    console.log('test callback activated with parameter step 1 : ' + JSON.stringify(testCallbackParameter));
    testCallbackParameter.testValue += 1;
    console.log('test callback activated with parameter : ' + JSON.stringify(testCallbackParameter));
    
  }

  async activate(parameter: TKTestCallbackParameter): Promise<void> {
    this.onTest(parameter)
  }
  
}