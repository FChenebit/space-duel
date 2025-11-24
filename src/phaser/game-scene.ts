import playerImage from '../assets/red_01.png';
import backgroundImage from '../assets/Background.png';
import DroneImage from '../assets/blue_01.png';
import PreyImage from '../assets/green_06.png';
import HunterImage from '../assets/purple_03.png';
import ProjectileImage from '../assets/projectile.png';

import { RandomIDGenerator } from '../core/adapters/random-id-generator';
import { SPlayerShipRepository } from '../gameplay/player-ship/adapters/SPlayerShipRepository';
import { SInitPlayerShip } from '../gameplay/player-ship/commands/SInitPlayerShip';
import { TKSpriteManager } from '../tinker/adapters/TKSpriteManager';
import { TKController } from '../tinker/controllers/TKController';
import { ITKInitControllerCallback } from '../tinker/game-interfaces/TKInitControllerCallbackInterface';
import { ITKKeyboardControllerCallback } from '../tinker/game-interfaces/TKKeyboarControllerCallbackInterface';
import { ITKMouseControllerCallback } from '../tinker/game-interfaces/TKMouseControllerCallbackInterface';
import { ITKUpdateControllerCallback } from '../tinker/game-interfaces/TKUpdateControllerCallbackInterface';
import { SSteerPlayerShip } from '../gameplay/player-ship/commands/SSteerPlayerShip';
import { SAcceleratePlayerShip } from '../gameplay/player-ship/commands/SAcceleratePlayerShip';
import { SMoveBackground } from '../gameplay/player-ship/commands/SMoveBackground';
import { SMovePlayerShip } from '../gameplay/player-ship/commands/SMovePlayerShip';

export class GameScene extends Phaser.Scene {
  initController: TKController<ITKInitControllerCallback>;
  spriteManager: TKSpriteManager;
  mouseController: TKController<ITKMouseControllerCallback>;
  updateController: TKController<ITKUpdateControllerCallback>;
  keyboardController: TKController<ITKKeyboardControllerCallback>;

  constructor() {
    super({key:'GameScence'});
    this.initController = new TKController<ITKInitControllerCallback>();
    this.mouseController = new TKController<ITKMouseControllerCallback>();
    this.updateController = new TKController<ITKUpdateControllerCallback>();
    this.keyboardController = new TKController<ITKKeyboardControllerCallback>();
    this.spriteManager = new TKSpriteManager(new RandomIDGenerator(),this);

  }


  preload() {
    this.load.image('PlayerShip', playerImage);
    this.load.image('Background1', backgroundImage);
    this.load.image('Background2', backgroundImage);
    this.load.image('Background3', backgroundImage);
    this.load.image('Background4', backgroundImage);
    this.load.image('DRONE', DroneImage);
    this.load.image('PREY', PreyImage);
    this.load.image('HUNTER', HunterImage);
    this.load.image('Projectile', ProjectileImage);

  }

  create() {
    const gameW = this.scale.width;
    const gameH = this.scale.height;
    //const playerId = this.spriteManager.newSprite('player',gameW/2,gameH/2,30,30);
    //this.player = this.add.image(70,180,'player');
    console.log('W : ' + gameW + ' H : ' + gameH);

    const newPlayerShipRepository = new SPlayerShipRepository();
    const initPlayerShip = new SInitPlayerShip(newPlayerShipRepository,gameW,gameH,this.spriteManager);
    this.initController.addCallback(initPlayerShip);

    this.initController.activate({});

    const steerPlayerShip = new SSteerPlayerShip(newPlayerShipRepository,gameW,gameW,this.spriteManager);
    this.mouseController.addCallback(steerPlayerShip);
    
    const acceleratePlayerShip = new SAcceleratePlayerShip(newPlayerShipRepository,gameH,this.spriteManager);
    //const newProjectileRepository = new SIdentifiableRepository<SProjectile>();
    //const playerFireWeapon = new SPlayerFireWeapon(new RandomIDGenerator(), this.spriteManager, newPlayerShipRepository,
    // newProjectileRepository);
    // this.keyboardController.addCallback(playerFireWeapon);
    this.keyboardController.addCallback(acceleratePlayerShip);

    const moveBackground = new SMoveBackground(this.spriteManager, gameW, gameH);
    //const displayEnemyShip = new SDisplayEnemyShip(newEnemyShipRepository, this.spriteManager, gameW, gameH);
    //const displayProjectile = new SDisplayProjectile(newProjectileRepository, this.spriteManager, gameW, gameH);
    const moveCallbacks = [moveBackground/*, displayEnemyShip,displayProjectile*/];

    const movePlayerShip = new SMovePlayerShip(newPlayerShipRepository,moveCallbacks, this.spriteManager);
    //const iaEnemyShip = new SIAEnemyShip(newEnemyShipRepository, newPlayerShipRepository);
    //const moveProjectile = new SMoveProjectile(newProjectileRepository);
    //const newRemoveProjectile = new SRemoveProjectile(newProjectileRepository, this.spriteManager);
    //const newRemoveEnemyShip = new SRemoveEnemyShip(newEnemyShipRepository, this.spriteManager);
    //const testCollision = new STestCollision(newProjectileRepository, newEnemyShipRepository, newRemoveProjectile, newRemoveEnemyShip);
    this.updateController.addCallback(movePlayerShip);
    //this.updateController.addCallback(iaEnemyShip);
    //this.updateController.addCallback(moveProjectile);
    //this.updateController.addCallback(testCollision);


    
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      this.mouseController.activate(pointer);
    });

    this.input.keyboard?.on('keydown',(event: { code: string; }) => {
      this.keyboardController.activate({code: event.code});
    })


  }

  update(_time : number,delta : number) {
    this.updateController.activate({deltaTime: delta});
  }
}