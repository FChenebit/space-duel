import type { SNavigationBar } from '../entities/SNavigationBar';
import type { SPlayerShip } from '../entities/SPlayerShip';
import { SSpeedBar } from '../entities/SSpeedBar';

export class SPlayerShipRepository {
  private playerShip!: SPlayerShip;
  private navigationBar!: SNavigationBar;
  private speedBar!: SSpeedBar;
  
  setPlayerShip(newPlayerShip: SPlayerShip) {
    this.playerShip = newPlayerShip;
  }

  getPlayerShip(): SPlayerShip {
    return this.playerShip;
  }

  setNavigationBar(newNavigationBar: SNavigationBar) {
    this.navigationBar = newNavigationBar;
  }

  getNavigationBar(): SNavigationBar {
    return this.navigationBar;
  }

  setSpeedBar(newSpeedBar: SSpeedBar) {
    this.speedBar = newSpeedBar;
  }

  getSpeedBar(): SSpeedBar {
    return this.speedBar;
  }

}