import { TKTestCallback } from "../tests/TKTestCallback";
import { TKTestCallbackParameter } from "../tests/TKTestCallbackParameter";
import { TKController } from "./TKController";

describe('TKController', () => {

  it('should add a callback', () => {
    const testController = new TKController<TKTestCallback>();
    const newTestCallback = new TKTestCallback();
    testController.addCallback(newTestCallback);
    const countCallbacks = testController.countCallbacks();
    expect(countCallbacks).toBe(1);
  });

  it('should call a callback', () => {
    const testController = new TKController<TKTestCallback>();
    const newTestCallback = new TKTestCallback();
    testController.addCallback(newTestCallback);
    const testCallbackParameter = new TKTestCallbackParameter(1);
    testController.activate(testCallbackParameter);
    expect(testCallbackParameter.testValue).toBe(2);
    
  });
});