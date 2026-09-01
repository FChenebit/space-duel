import { FixIDGenerator } from "../../../core/adapters/fix-id-generator";
import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { TestSpriteManager } from "../../../mockups/adapters/TestSpriteManager";
import { SNewEnemyShip } from "../../enemy-ship/commands/SNewEnemyShip";
import { SEnemyShip, SEnemyShipTypeEnum } from "../../enemy-ship/entities/SEnemyShip";
import { SProjectile } from "../../projectile/entity/SProjectile";
import { SWeapon } from "../../weapon/entities/SWeapon";
import { SCreateEnemyShipFromLevel } from "./SCreateEnemyShipFromLevel";

describe('SCreateEnemyShipFromLevel', () => {
    
  let repository: SIdentifiableRepository<SEnemyShip>;
  let newEnemyShip: SNewEnemyShip; 
  let createEnemyShipFromLevel: SCreateEnemyShipFromLevel;
  
  beforeEach(() => {
    repository = new SIdentifiableRepository<SEnemyShip>();
  
    newEnemyShip = new SNewEnemyShip(repository, new FixIDGenerator(),
      new TestSpriteManager(), new SIdentifiableRepository<SWeapon>(),
      new SIdentifiableRepository<SProjectile>());

  })

  it('create enemy ship for Level 1', () => {
    createEnemyShipFromLevel = new SCreateEnemyShipFromLevel();
    createEnemyShipFromLevel.execute(1, newEnemyShip);
    let drone = repository.getById('ID-1');
    expect(drone!.x).toBe(0);
    expect(drone!.y).toBe(200);
    expect(drone!.type).toBe(SEnemyShipTypeEnum.DRONE);
    expect(drone!.speed).toBe(50);
  })

  it('create enemy ship for Level 2', () => {
    createEnemyShipFromLevel = new SCreateEnemyShipFromLevel();
    createEnemyShipFromLevel.execute(2, newEnemyShip);
    console.log('repository ' + repository);
    let ship1 = repository.getById('ID-1');
    expect(ship1!.x).toBe(200);
    expect(ship1!.y).toBe(200);
    expect(ship1!.type).toBe(SEnemyShipTypeEnum.PREY);
    expect(ship1!.speed).toBe(50);
    expect(ship1!.steering).toBe(Math.PI / 8);

  });

  it('create enemy ship for Level 3', () => {
    createEnemyShipFromLevel = new SCreateEnemyShipFromLevel();
    createEnemyShipFromLevel.execute(3, newEnemyShip);
    console.log('repository ' + repository);
    let ship1 = repository.getById('ID-1');
    expect(ship1!.x).toBe(0);
    expect(ship1!.y).toBe(200);
    expect(ship1!.type).toBe(SEnemyShipTypeEnum.DRONE);
    expect(ship1!.speed).toBe(50);
    
    let ship2 = repository.getById('ID-5');
    expect(ship2!.x).toBe(200);
    expect(ship2!.y).toBe(200);
    expect(ship2!.type).toBe(SEnemyShipTypeEnum.PREY);
    expect(ship2!.speed).toBe(50);
    expect(ship2!.steering).toBe(Math.PI / 8);
  });
  
  it('create enemy ship for Level 4', () => {
    createEnemyShipFromLevel = new SCreateEnemyShipFromLevel();
    createEnemyShipFromLevel.execute(4, newEnemyShip);
    let ship1 = repository.getById('ID-1');
    expect(ship1!.x).toBe(400);
    expect(ship1!.y).toBe(-400);
    expect(ship1!.type).toBe(SEnemyShipTypeEnum.HUNTER);
    expect(ship1!.speed).toBe(40);
    expect(ship1!.steering).toBe(Math.PI / 12);
    
  });

    it('create enemy ship for Level 5', () => {
      createEnemyShipFromLevel = new SCreateEnemyShipFromLevel();
      createEnemyShipFromLevel.execute(5, newEnemyShip);
      let ship1 = repository.getById('ID-1');
      expect(ship1!.x).toBe(0);
      expect(ship1!.y).toBe(200);
      expect(ship1!.type).toBe(SEnemyShipTypeEnum.DRONE);
      expect(ship1!.speed).toBe(50);
    
      let ship2 = repository.getById('ID-5');
      expect(ship2!.x).toBe(400);
      expect(ship2!.y).toBe(-400);
      expect(ship2!.type).toBe(SEnemyShipTypeEnum.HUNTER);
      expect(ship2!.speed).toBe(40);
      expect(ship2!.steering).toBe(Math.PI / 12);
    
  });

  it('create enemy ship for Level 6', () => {
    createEnemyShipFromLevel = new SCreateEnemyShipFromLevel();
    createEnemyShipFromLevel.execute(6, newEnemyShip);
    let ship1 = repository.getById('ID-1');
    expect(ship1!.x).toBe(0);
    expect(ship1!.y).toBe(200);
    expect(ship1!.type).toBe(SEnemyShipTypeEnum.DRONE);
    expect(ship1!.speed).toBe(50);

    let ship2 = repository.getById('ID-5');
    expect(ship2!.x).toBe(200);
    expect(ship2!.y).toBe(200);
    expect(ship2!.type).toBe(SEnemyShipTypeEnum.PREY);
    expect(ship2!.speed).toBe(50);
    expect(ship2!.steering).toBe(Math.PI / 8);

    
    let ship3 = repository.getById('ID-9');
    expect(ship3!.x).toBe(400);
    expect(ship3!.y).toBe(-400);
    expect(ship3!.type).toBe(SEnemyShipTypeEnum.HUNTER);
    expect(ship3!.speed).toBe(40);
    expect(ship3!.steering).toBe(Math.PI / 12);
    
  });

  it('create enemy ship for Level 10', () => {
    createEnemyShipFromLevel = new SCreateEnemyShipFromLevel();
    createEnemyShipFromLevel.execute(10, newEnemyShip);
    let ship1 = repository.getById('ID-1');
    expect(ship1!.x).toBe(0);
    expect(ship1!.y).toBe(200);
    expect(ship1!.type).toBe(SEnemyShipTypeEnum.DRONE);
    expect(ship1!.speed).toBe(50);

    let ship2 = repository.getById('ID-5');
    expect(ship2!.x).toBe(200);
    expect(ship2!.y).toBe(200);
    expect(ship2!.type).toBe(SEnemyShipTypeEnum.PREY);
    expect(ship2!.speed).toBe(50);
    expect(ship2!.steering).toBe(Math.PI / 8);

    
    let ship3 = repository.getById('ID-9');
    expect(ship3!.x).toBe(400);
    expect(ship3!.y).toBe(-400);
    expect(ship3!.type).toBe(SEnemyShipTypeEnum.HUNTER);
    expect(ship3!.speed).toBe(40);
    expect(ship3!.steering).toBe(Math.PI / 12);
    
    let ship4 = repository.getById('ID-13');
    expect(ship4!.x).toBe(-400);
    expect(ship4!.y).toBe(400);
    expect(ship4!.type).toBe(SEnemyShipTypeEnum.HUNTER);
    expect(ship4!.speed).toBe(40);
    expect(ship4!.steering).toBe(Math.PI / 12);
  });

  it('create enemy ship for Level 51', () => {
    // 9 drone, 9 proie, 8 chasseurs
    createEnemyShipFromLevel = new SCreateEnemyShipFromLevel();
    createEnemyShipFromLevel.execute(51, newEnemyShip);
    let drone1 = repository.getById('ID-1');
    expect(drone1!.x).toBe(0);
    expect(drone1!.y).toBe(200);
    expect(drone1!.type).toBe(SEnemyShipTypeEnum.DRONE);
    expect(drone1!.speed).toBe(50);

    let drone2 = repository.getById('ID-5');
    expect(drone2!.x).toBe(200);
    expect(drone2!.y).toBe(0);
    expect(drone2!.type).toBe(SEnemyShipTypeEnum.DRONE);
    expect(drone2!.speed).toBe(50);

    let drone3 = repository.getById('ID-9');
    expect(drone3!.x).toBe(0);
    expect(drone3!.y).toBe(-200);
    expect(drone3!.type).toBe(SEnemyShipTypeEnum.DRONE);
    expect(drone3!.speed).toBe(50);

    let drone4 = repository.getById('ID-13');
    expect(drone4!.x).toBe(-200);
    expect(drone4!.y).toBe(0);
    expect(drone4!.type).toBe(SEnemyShipTypeEnum.DRONE);
    expect(drone4!.speed).toBe(50);

    let drone5 = repository.getById('ID-17');
    expect(drone5!.x).toBe(0);
    expect(drone5!.y).toBe(400);
    expect(drone5!.type).toBe(SEnemyShipTypeEnum.DRONE);
    expect(drone5!.speed).toBe(50);

    let drone6 = repository.getById('ID-21');
    expect(drone6!.x).toBe(400);
    expect(drone6!.y).toBe(0);
    expect(drone6!.type).toBe(SEnemyShipTypeEnum.DRONE);
    expect(drone6!.speed).toBe(50);

    let drone7 = repository.getById('ID-25');
    expect(drone7!.x).toBe(0);
    expect(drone7!.y).toBe(-400);
    expect(drone7!.type).toBe(SEnemyShipTypeEnum.DRONE);
    expect(drone7!.speed).toBe(50);

    let drone8 = repository.getById('ID-29');
    expect(drone8!.x).toBe(-400);
    expect(drone8!.y).toBe(0);
    expect(drone8!.type).toBe(SEnemyShipTypeEnum.DRONE);
    expect(drone8!.speed).toBe(50);

    let drone9 = repository.getById('ID-33');
    expect(drone9!.x).toBe(0);
    expect(drone9!.y).toBe(600);
    expect(drone9!.type).toBe(SEnemyShipTypeEnum.DRONE);
    expect(drone9!.speed).toBe(50);

    let prey1 = repository.getById('ID-37');
    expect(prey1!.x).toBe(200);
    expect(prey1!.y).toBe(200);
    expect(prey1!.type).toBe(SEnemyShipTypeEnum.PREY);
    expect(prey1!.speed).toBe(50);
    expect(prey1!.steering).toBe(Math.PI / 8);

    let prey2 = repository.getById('ID-41');
    expect(prey2!.x).toBe(-200);
    expect(prey2!.y).toBe(-200);
    expect(prey2!.type).toBe(SEnemyShipTypeEnum.PREY);
    expect(prey2!.speed).toBe(50);
    expect(prey2!.steering).toBe(Math.PI / 8);

    let prey3 = repository.getById('ID-45');
    expect(prey3!.x).toBe(400);
    expect(prey3!.y).toBe(400);
    expect(prey3!.type).toBe(SEnemyShipTypeEnum.PREY);
    expect(prey3!.speed).toBe(50);
    expect(prey3!.steering).toBe(Math.PI / 8);

    let prey4 = repository.getById('ID-49');
    expect(prey4!.x).toBe(-400);
    expect(prey4!.y).toBe(-400);
    expect(prey4!.type).toBe(SEnemyShipTypeEnum.PREY);
    expect(prey4!.speed).toBe(50);
    expect(prey4!.steering).toBe(Math.PI / 8);

    let prey5 = repository.getById('ID-53');
    expect(prey5!.x).toBe(600);
    expect(prey5!.y).toBe(600);
    expect(prey5!.type).toBe(SEnemyShipTypeEnum.PREY);
    expect(prey5!.speed).toBe(50);
    expect(prey5!.steering).toBe(Math.PI / 8);

    let prey6 = repository.getById('ID-57');
    expect(prey6!.x).toBe(-600);
    expect(prey6!.y).toBe(-600);
    expect(prey6!.type).toBe(SEnemyShipTypeEnum.PREY);
    expect(prey6!.speed).toBe(50);
    expect(prey6!.steering).toBe(Math.PI / 8);

    let prey7 = repository.getById('ID-61');
    expect(prey7!.x).toBe(800);
    expect(prey7!.y).toBe(800);
    expect(prey7!.type).toBe(SEnemyShipTypeEnum.PREY);
    expect(prey7!.speed).toBe(50);
    expect(prey7!.steering).toBe(Math.PI / 8);

    let prey8 = repository.getById('ID-65');
    expect(prey8!.x).toBe(-800);
    expect(prey8!.y).toBe(-800);
    expect(prey8!.type).toBe(SEnemyShipTypeEnum.PREY);
    expect(prey8!.speed).toBe(50);
    expect(prey8!.steering).toBe(Math.PI / 8);

    let prey9 = repository.getById('ID-69');
    expect(prey9!.x).toBe(1000);
    expect(prey9!.y).toBe(1000);
    expect(prey9!.type).toBe(SEnemyShipTypeEnum.PREY);
    expect(prey9!.speed).toBe(50);
    expect(prey9!.steering).toBe(Math.PI / 8);

    
    let hunter1 = repository.getById('ID-73');
    expect(hunter1!.x).toBe(400);
    expect(hunter1!.y).toBe(-400);
    expect(hunter1!.type).toBe(SEnemyShipTypeEnum.HUNTER);
    expect(hunter1!.speed).toBe(40);
    expect(hunter1!.steering).toBe(Math.PI / 12);
    
    let hunter2 = repository.getById('ID-77');
    expect(hunter2!.x).toBe(-400);
    expect(hunter2!.y).toBe(400);
    expect(hunter2!.type).toBe(SEnemyShipTypeEnum.HUNTER);
    expect(hunter2!.speed).toBe(40);
    expect(hunter2!.steering).toBe(Math.PI / 12);

    let hunter3 = repository.getById('ID-81');
    expect(hunter3!.x).toBe(800);
    expect(hunter3!.y).toBe(-800);
    expect(hunter3!.type).toBe(SEnemyShipTypeEnum.HUNTER);
    expect(hunter3!.speed).toBe(40);
    expect(hunter3!.steering).toBe(Math.PI / 12);

    let hunter4 = repository.getById('ID-85');
    expect(hunter4!.x).toBe(-800);
    expect(hunter4!.y).toBe(800);
    expect(hunter4!.type).toBe(SEnemyShipTypeEnum.HUNTER);
    expect(hunter4!.speed).toBe(40);
    expect(hunter4!.steering).toBe(Math.PI / 12);

    let hunter5 = repository.getById('ID-89');
    expect(hunter5!.x).toBe(1200);
    expect(hunter5!.y).toBe(-1200);
    expect(hunter5!.type).toBe(SEnemyShipTypeEnum.HUNTER);
    expect(hunter5!.speed).toBe(40);
    expect(hunter5!.steering).toBe(Math.PI / 12);

    let hunter6 = repository.getById('ID-93');
    expect(hunter6!.x).toBe(-1200);
    expect(hunter6!.y).toBe(1200);
    expect(hunter6!.type).toBe(SEnemyShipTypeEnum.HUNTER);
    expect(hunter6!.speed).toBe(40);
    expect(hunter6!.steering).toBe(Math.PI / 12);

    let hunter7 = repository.getById('ID-97');
    expect(hunter7!.x).toBe(1600);
    expect(hunter7!.y).toBe(-1600);
    expect(hunter7!.type).toBe(SEnemyShipTypeEnum.HUNTER);
    expect(hunter7!.speed).toBe(40);
    expect(hunter7!.steering).toBe(Math.PI / 12);

    let hunter8 = repository.getById('ID-101');
    expect(hunter8!.x).toBe(-1600);
    expect(hunter8!.y).toBe(1600);
    expect(hunter8!.type).toBe(SEnemyShipTypeEnum.HUNTER);
    expect(hunter8!.speed).toBe(40);
    expect(hunter8!.steering).toBe(Math.PI / 12);

  });

})