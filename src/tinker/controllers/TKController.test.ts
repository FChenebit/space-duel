import { FixIDGenerator } from "../../core/adapters/fix-id-generator";
import { TKTestCallback } from "../tests/TKTestCallback";
import { TKTestCallbackParameter } from "../tests/TKTestCallbackParameter";
import { TKController } from "./TKController";

describe('TKController', () => {

  it('should add a callback', () => {
    const testController = new TKController<TKTestCallback>();
    const fixIDGenerator = new FixIDGenerator();
    const newTestCallback = new TKTestCallback(fixIDGenerator.generate());
    testController.addCallback(newTestCallback);
    const countCallbacks = testController.countCallbacks();
    expect(countCallbacks).toBe(1);
  });

  it('should call a callback', () => {
    const testController = new TKController<TKTestCallback>();
    const fixIDGenerator = new FixIDGenerator();
    const newTestCallback = new TKTestCallback(fixIDGenerator.generate());
    testController.addCallback(newTestCallback);
    const testCallbackParameter = new TKTestCallbackParameter(1);
    testController.activate(testCallbackParameter);
    expect(testCallbackParameter.testValue).toBe(2);
    
  });

  it('should remove a callback', () => {
    const testController = new TKController<TKTestCallback>();
    const fixIDGenerator = new FixIDGenerator();
    const newTestCallback = new TKTestCallback(fixIDGenerator.generate());
    testController.addCallback(newTestCallback);
    const testCallbackParameter = new TKTestCallbackParameter(1);
    const newTestCallback2 = new TKTestCallback(fixIDGenerator.generate());
    testController.addCallback(newTestCallback2);
    const countCallbacks2 = testController.countCallbacks();
    expect(countCallbacks2).toBe(2);
    testController.removeCallback(newTestCallback2);
    const countCallbacks3        = testController.countCallbacks();
    expect(countCallbacks3).toBe(1);
    testController.activate(testCallbackParameter);
    expect(testCallbackParameter.testValue).toBe(2);
  });

});