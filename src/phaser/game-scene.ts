import playerImage from '../assets/red_01.png';
import backgroundImage from '../assets/Background.png';
import DroneImage from '../assets/blue_01.png';
import PreyImage from '../assets/green_06.png';
import HunterImage from '../assets/purple_03.png';
import LaserImage from '../assets/laser.png';
import MissileImage from '../assets/missile.png';
import MineImage from '../assets/mine.png';

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
import { SIdentifiableRepository } from '../core/adapters/SIdentifiableRepository';
import { SEnemyShip } from '../gameplay/enemy-ship/entities/SEnemyShip';
import { SNewEnemyShip } from '../gameplay/enemy-ship/commands/SNewEnemyShip';
import { SProjectile } from '../gameplay/projectile/entity/SProjectile';
import { SPlayerFireWeapon } from '../gameplay/player-ship/commands/SPlayerFireWeapon';
import { SDisplayEnemyShip } from '../gameplay/enemy-ship/commands/SDisplayEnemyShip';
import { SDisplayProjectile } from '../gameplay/projectile/commands/SDisplayProjectile';
import { SIAEnemyShip } from '../gameplay/enemy-ship/commands/SIAEnemyShip';
import { SMoveProjectile } from '../gameplay/projectile/commands/SMoveProjectile';
import { SRemoveProjectile } from '../gameplay/projectile/commands/SRemoveProjectile';
import { SRemoveEnemyShip } from '../gameplay/enemy-ship/commands/SRemoveEnemyShip';
import { STestCollision } from '../gameplay/projectile/commands/STestCollision';
import { SWeapon } from '../gameplay/weapon/entities/SWeapon';
import { SReloadAllWeapons } from '../gameplay/weapon/commands/SReloadAllWeapons';
import { SFireEnemyShip } from '../gameplay/enemy-ship/commands/SFireEnemyShip';
import { UComputeFPS } from '../utils/commands/UComputeFPS';
import { SCreateEnemyShipFromLevel } from '../gameplay/level/commands/SCreateEnemyShipFromLevel';
import { SPlayerShipEnhancement } from '../gameplay/player-ship/entities/SPlayerShipEnhancement';
import { SInitRound } from '../gameplay/round/commands/SInitRound';
import { SRoundRepository } from '../gameplay/round/adapters/SRoundRepository';
import { SReduceTimer } from '../gameplay/round/commands/SReduceTimer';
import { NavigateFunction } from 'react-router-dom';
import { SQuitGame } from '../gameplay/round/commands/SQuitGame';
import { SGameOver } from '../gameplay/round/commands/SGameOver';

export class GameScene extends Phaser.Scene {
  initController: TKController<ITKInitControllerCallback>;
  spriteManager: TKSpriteManager;
  mouseController: TKController<ITKMouseControllerCallback>;
  updateController: TKController<ITKUpdateControllerCallback>;
  keyboardController: TKController<ITKKeyboardControllerCallback>;
  level: number;
  playerEnhancement: SPlayerShipEnhancement;
  navigator: NavigateFunction

  constructor(curLevel: number,curPlayerEnhancement:SPlayerShipEnhancement,newNavigator: NavigateFunction) {
    console.log('level in scene constructor ' + curLevel);
    super({key:'GameScence'});
    this.initController = new TKController<ITKInitControllerCallback>();
    this.mouseController = new TKController<ITKMouseControllerCallback>();
    this.updateController = new TKController<ITKUpdateControllerCallback>();
    this.keyboardController = new TKController<ITKKeyboardControllerCallback>();
    this.spriteManager = new TKSpriteManager(new RandomIDGenerator(),this);
    this.level = curLevel;
    this.playerEnhancement = curPlayerEnhancement;
    this.navigator = newNavigator;
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
    this.load.image('Laser', LaserImage);
    this.load.image('Missile', MissileImage);
    this.load.image('Mine', MineImage);

  }

  create() {
    //console.log('scene create');
    const gameW = this.scale.width;
    const gameH = this.scale.height;
    //const playerId = this.spriteManager.newSprite('player',gameW/2,gameH/2,30,30);
    //this.player = this.add.image(70,180,'player');
    //console.log('W : ' + gameW + ' H : ' + gameH);
    //console.log('level ' + this.level);

    const newPlayerShipRepository = new SPlayerShipRepository();
    const newRoundRepository = new SRoundRepository();
    const newWeaponRepository = new SIdentifiableRepository<SWeapon>();
    const newProjectileRepository = new SIdentifiableRepository<SProjectile>();
    const newEnemyShipRepository = new SIdentifiableRepository<SEnemyShip>();

    const initPlayerShip = new SInitPlayerShip(new RandomIDGenerator(), 
    newPlayerShipRepository,gameW,gameH,this.spriteManager, newWeaponRepository, this.playerEnhancement);
    this.initController.addCallback(initPlayerShip);
    const initRound = new SInitRound(newRoundRepository,this.spriteManager, gameW);
    this.initController.addCallback(initRound);
    
    /*this.spriteManager.newText('TFCTFC', gameW/2,50,{
      fontSize: '32px',
      color: '#ffffff'
    });*/

    this.initController.activate({});

    //console.log('Creating enemy ship');
    const newEnemyShip = new SNewEnemyShip(newEnemyShipRepository, new RandomIDGenerator(), this.spriteManager,
      newWeaponRepository, newProjectileRepository);
    const createEnemyShipFromLevel = new SCreateEnemyShipFromLevel();
    createEnemyShipFromLevel.execute(this.level, newEnemyShip);
    //newEnemyShip.execute(-100,200,50,Math.PI/16,SEnemyShipTypeEnum.HUNTER);
    //console.log('After Creating enemy ship repo count: ' + newEnemyShipRepository.count());
    //newEnemyShipRepository.getAll().forEach(enemyShip => {
      //console.log('Enemy ship: ' + enemyShip.id);
    //});


    const steerPlayerShip = new SSteerPlayerShip(newPlayerShipRepository,gameW,gameW,this.spriteManager);
    this.mouseController.addCallback(steerPlayerShip);
    
    const acceleratePlayerShip = new SAcceleratePlayerShip(newPlayerShipRepository,gameH,this.spriteManager);
    const playerFireWeapon = new SPlayerFireWeapon(new RandomIDGenerator(), this.spriteManager, newPlayerShipRepository,
     newProjectileRepository);
    this.keyboardController.addCallback(playerFireWeapon);
    this.keyboardController.addCallback(acceleratePlayerShip);

    const moveBackground = new SMoveBackground(this.spriteManager, gameW, gameH);
    const displayEnemyShip = new SDisplayEnemyShip(newEnemyShipRepository, this.spriteManager, gameW, gameH);
    const displayProjectile = new SDisplayProjectile(newProjectileRepository, this.spriteManager, gameW, gameH);
    const moveCallbacks = [moveBackground, displayEnemyShip,displayProjectile];

    const movePlayerShip = new SMovePlayerShip(newPlayerShipRepository,moveCallbacks, this.spriteManager);
    const iaEnemyShip = new SIAEnemyShip(newEnemyShipRepository, newPlayerShipRepository);
    const moveProjectile = new SMoveProjectile(newProjectileRepository,newEnemyShipRepository,newPlayerShipRepository);
    const newRemoveProjectile = new SRemoveProjectile(newProjectileRepository, this.spriteManager);
    const newRemoveEnemyShip = new SRemoveEnemyShip(newEnemyShipRepository, this.spriteManager);
    const testCollision = new STestCollision(newProjectileRepository, newEnemyShipRepository, newRemoveProjectile, newRemoveEnemyShip);
    const reloadAllWeapons = new SReloadAllWeapons(newWeaponRepository);
    const fireEnemyShip = new SFireEnemyShip(newEnemyShipRepository);
    const computeFPS = new UComputeFPS();
    const quitGame = new SQuitGame(this.navigator);
    const gameOver = new SGameOver(quitGame,this.spriteManager,gameW,gameH,this.updateController);
    const reduceTimer = new SReduceTimer(newRoundRepository,this.spriteManager,gameOver);
    this.updateController.addCallback(movePlayerShip);
    this.updateController.addCallback(iaEnemyShip);
    this.updateController.addCallback(moveProjectile);
    this.updateController.addCallback(testCollision);
    this.updateController.addCallback(reloadAllWeapons);
    this.updateController.addCallback(fireEnemyShip);
    this.updateController.addCallback(computeFPS);
    this.updateController.addCallback(reduceTimer);
    
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