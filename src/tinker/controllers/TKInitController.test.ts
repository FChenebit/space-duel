import type { ITKInitControllerCallback } from '../game-interfaces/TKInitControllerCallbackInterface';
import { TKInitController } from './TKInitController'

describe('TKInitController', () => {

  let initController: TKInitController;
  let initValue1 = 0;
  let initValue2 = 0;
  class TKInitCallbackTest implements ITKInitControllerCallback {
    async onInit(): Promise<void> {
      initValue1 += 1;
    }
  }
  class TKInitCallbackTest2 implements ITKInitControllerCallback {
    async onInit(): Promise<void> {
      initValue2 += 1;
    }
  }
  let initCallback1: TKInitCallbackTest;
  let initCallback2: TKInitCallbackTest2;
  
  beforeEach(() => {
    initController = new TKInitController();
    initCallback1 = new TKInitCallbackTest();
    initCallback2 = new TKInitCallbackTest2();
  })

  it('should be true', async () => {
    expect(true).toBe(true);
  });

  it('should add a callback', () => {
    initController.addCallback(initCallback1);
    expect(initController.countCallback()).toBe(1);
    initController.addCallback(initCallback2);
    expect(initController.countCallback()).toBe(2);
  })

  it('should call the callbacks', async () => {
    initController.addCallback(initCallback1);
    initController.addCallback(initCallback2);
    await initController.activate();

    expect(initValue1).toBe(1);
    expect(initValue2).toBe(1);

  })
})