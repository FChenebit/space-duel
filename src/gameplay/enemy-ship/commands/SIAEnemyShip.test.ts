/* eslint-disable @typescript-eslint/no-unused-vars */
import { FixIDGenerator } from "../../../core/adapters/fix-id-generator";
import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { SFactionTypeEnum } from "../../../core/type/SFaction";
import { FullSceneCoordinate, ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { SPlayerShipRepository } from "../../player-ship/adapters/SPlayerShipRepository";
import { SPlayerShip } from "../../player-ship/entities/SPlayerShip";
import { SProjectileTypeEnum } from "../../projectile/entity/SProjectile";
import { SWeapon } from "../../weapon/entities/SWeapon";
import { SEnemyShip, SEnemyShipTypeEnum } from "../entities/SEnemyShip";
import { SIAEnemyShip } from "./SIAEnemyShip";
import { SNewEnemyShip } from "./SNewEnemyShip";

describe('SIAEnemyShip', () => {

  const repository = new SIdentifiableRepository<SEnemyShip>();
  const playerRepository = new SPlayerShipRepository();
  class TestSpriteManager implements ITKSpriteManager {
    
    newSprite(_newTextureName: string, _newX: number, _newY: number, _newWidth: number, _newHeight: number, _newDepth?: number): string {
      console.log('creating an enemyShip');
      return 'ID-2';
    }
    removeRepresentation(_representationId: string): void {
      throw new Error("Method not implemented.");
    }
    moveRepresentationToXY(_representationId: string, _newX: number, _newY: number): void {
      throw new Error("Method not implemented.");
    }
    translateRepresentation(_representationId: string, _deltaX: number, _deltaY: number): void {
      throw new Error("Method not implemented.");
    }
    rotateRepresantationToAngle(_representationId: string, _newRotation: number): void {
      throw new Error("Method not implemented.");
    }
    newCircle(_newX: number, _newY: number, _radius: number, _colorFill: number): string {
      throw new Error("Method not implemented.");
    }
    getRepresentationFullSceneCoordinate(_representationId: string): FullSceneCoordinate {
      throw new Error("Method not implemented.");
    }
    newRectangle(_newX: number, _newY: number, _newWidth: number, _newHeight: number, _radius: number, _colorFill: number): string {
      throw new Error("Method not implemented.");
    }
    
  }

  const newEnemyShip = new SNewEnemyShip(repository, new FixIDGenerator(),new TestSpriteManager());
  newEnemyShip.execute(0,200,0,Math.PI/8,SEnemyShipTypeEnum.HUNTER);

  const newPlayerShip = new SPlayerShip(0, 0, 'TFC',0,0,new SWeapon('1', 100, 20000, 10, 200, SProjectileTypeEnum.LASER, SFactionTypeEnum.PLAYER),
  new SWeapon('2', 100, 20000, 10, 200, SProjectileTypeEnum.MISSILE, SFactionTypeEnum.PLAYER),
  new SWeapon('3', 100, 20000, 10, 200, SProjectileTypeEnum.MINE, SFactionTypeEnum.PLAYER));
  playerRepository.setPlayerShip(newPlayerShip);


  const iaEnemyShip = new SIAEnemyShip(repository,playerRepository);

  function testEnemyShipRotation(enemyShip: SEnemyShip, expectedRotation: number, x: number, y: number, initialRotation: number) {
    enemyShip.x = x;
    enemyShip.y = y;
    enemyShip.rotation = initialRotation;
    iaEnemyShip.onUpdate(500);
    expect(enemyShip.rotation).toBe(expectedRotation);
  }

  describe('Scenario 0 : Enemy ship x0, y -100, rotation 0', () => {
    const enemyShip = repository.getById('ID-1')!;    
    it('01 - should find a Math.PI/16 rotation', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16, 0, -100, 0);
    });
    it('02 -should find a Math.PI/16+Math.PI/4 rotation', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/4, 0, -100, Math.PI/4);
    });
    it('03 - should find a Math.PI/16+Math.PI/2 rotation', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/2, 0, -100, Math.PI/2);
    });
    it('04 - should find a Math.PI/16+Math.PI*3/4 rotation', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI*3/4, 0, -100, Math.PI*3/4);
    });
    it('05 - should find a Math.PI rotation', () => {
      testEnemyShipRotation(enemyShip, Math.PI, 0, -100, Math.PI);
    });
    it('06 - should find a Math.PI/-16+Math.PI/-4 rotation', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI/-4, 0, -100, Math.PI/-4);
    });
    it('07 - should find a Math.PI/-16+Math.PI/-2 rotation', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI/-2, 0, -100, Math.PI/-2);
    });
    it('08 - should find a Math.PI/-16+Math.PI*-3/-4 rotation', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI*3/-4, 0, -100, Math.PI*-3/4);
    });
    it('09 - should find a Math.PI/-1 rotation', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-1, 0, -100, Math.PI/-1);
    });

  });
  describe('Scenario 1 : Enemy ship x-100, y -100', () => {
    const enemyShip = repository.getById('ID-1')!;    
    it('11 R 0', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16, -100, -100, 0);
    });
    it('12 R Math.PI/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/4, -100, -100, Math.PI/4);
    });
    it('13 R Math.PI/2', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/2, -100, -100, Math.PI/2);
    });
    it('14 R Math.PI*3/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI*3/4, -100, -100, Math.PI*3/4);
    });
    it('15 R Math.PI', () => {
      testEnemyShipRotation(enemyShip, Math.PI-Math.PI/16, -100, -100, Math.PI);
    });
    it('16 R Math.PI/-4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/-4, -100, -100, Math.PI/-4);
    });
    it('17 R Math.PI/-2', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI/-2, -100, -100, Math.PI/-2);
    });
    it('18 R Math.PI*-3/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI*-3/4, -100, -100, Math.PI*-3/4);
    });
    it('19 R Math.PI/-1', () => {
      testEnemyShipRotation(enemyShip, Math.PI-Math.PI/16, -100, -100, Math.PI/-1);
    });
  });

  describe('Scenario 2 : Enemy ship x-100, y -0', () => {
    const enemyShip = repository.getById('ID-1')!;    
    it('21 R 0', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16, -100, 0, 0);
    });
    it('22 R Math.PI/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/4, -100, 0, Math.PI/4);
    });
    it('23 R Math.PI/2', () => {
      testEnemyShipRotation(enemyShip, Math.PI/2, -100, 0, Math.PI/2);
    });
    it('24 R Math.PI*3/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI*3/4, -100, 0, Math.PI*3/4);
    });
    it('25 R Math.PI', () => {
      testEnemyShipRotation(enemyShip, Math.PI-Math.PI/16, -100, 0, Math.PI);
    });
    it('26 R Math.PI/-4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/-4, -100, 0, Math.PI/-4);
    });
    it('27 R Math.PI/-2', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/-2, -100, 0, Math.PI/-2);
    });
    it('28 R Math.PI*-3/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI*-3/4, -100, 0, Math.PI*-3/4);
    });
    it('29 R Math.PI/-1', () => {
      testEnemyShipRotation(enemyShip, Math.PI-Math.PI/16, -100, 0, Math.PI/-1);
    });
  });

  describe('Scenario 3 : Enemy ship x-100, y 100, rotation 0', () => {
    const enemyShip = repository.getById('ID-1')!;    
    it('31 R 0', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16, -100, 100, 0);
    });
    it('32 R Math.PI/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/4, -100, 100, Math.PI/4);
    });
    it('33 R Math.PI/2', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI/2, -100, 100, Math.PI/2);
    });
    it('34 R Math.PI*3/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI*3/4, -100, 100, Math.PI*3/4);
    });
    it('35 R Math.PI', () => {
      testEnemyShipRotation(enemyShip, Math.PI-Math.PI/16, -100, 100, Math.PI);
    });
    it('36 R Math.PI/-4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/-4, -100, 100, Math.PI/-4);
    });
    it('37 R Math.PI/-2', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/-2, -100, 100, Math.PI/-2);
    });
    it('38 R Math.PI*-3/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI*-3/4, -100, 100, Math.PI*-3/4);
    });
    it('39 R Math.PI/-1', () => {
      testEnemyShipRotation(enemyShip, Math.PI-Math.PI/16, -100, 100, Math.PI/-1);
    });
  });

  describe('Scenario 4 : Enemy ship x 0, y 100', () => {
    const enemyShip = repository.getById('ID-1')!;    
    it('41 R 0', () => {
      testEnemyShipRotation(enemyShip, 0, 0, 100, 0);
    });
    it('42 R Math.PI/4', () => {
      testEnemyShipRotation(enemyShip,  Math.PI/-16+Math.PI/4, 0, 100, Math.PI/4);
    });
    it('43 R Math.PI/2', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI/2, 0, 100, Math.PI/2);
    });
    it('44 R Math.PI*3/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI*3/4, 0, 100, Math.PI*3/4);
    });
    it('45 R Math.PI', () => {
      testEnemyShipRotation(enemyShip, -1*(Math.PI-Math.PI/16), 0, 100, Math.PI);
    });
    it('46 R Math.PI/-4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/-4, 0, 100, Math.PI/-4);
    });
    it('47 R Math.PI/-2', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/-2, 0, 100, Math.PI/-2);
    });
    it('48 R Math.PI*-3/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI*-3/4, 0, 100, Math.PI*-3/4);
    });
    it('49 R Math.PI/-1', () => {
      testEnemyShipRotation(enemyShip, (Math.PI*-1)+Math.PI/16, 0, 100, Math.PI/-1);
    });
  });

  describe('Scenario 5 : Enemy ship x 100, y 100', () => {
    const enemyShip = repository.getById('ID-1')!;    
    it('51 R 0', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16, 100, 100, 0);
    });
    it('52 R Math.PI/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI/4, 100, 100, Math.PI/4);
    });
    it('53 R Math.PI/2', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI/2, 100, 100, Math.PI/2);
    });
    it('54 R Math.PI*3/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI*3/4, 100, 100, Math.PI*3/4);
    });
    it('55 R Math.PI', () => {
      testEnemyShipRotation(enemyShip, (Math.PI*-1)+Math.PI/16, 100, 100, Math.PI);
    });
    it('56 R Math.PI/-4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-4, 100, 100, Math.PI/-4);
    });
    it('57 R Math.PI/-2', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/-2, 100, 100, Math.PI/-2);
    });
    it('58 R Math.PI*-3/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI*-3/4, 100, 100, Math.PI*-3/4);
    });
    it('59 R Math.PI/-1', () => {
      testEnemyShipRotation(enemyShip, (Math.PI*-1)+Math.PI/16, 100, 100, Math.PI/-1);
    });
  });

  describe('Scenario 6 : Enemy ship x 100, y 0', () => {
    const enemyShip = repository.getById('ID-1')!;    
    it('61 R 0', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16, 100, 0, 0);
    });
    it('62 R Math.PI/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI/4, 100, 0, Math.PI/4);
    });
    it('63 R Math.PI/2', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/2, 100, 0, Math.PI/2);
    });
    it('64 R Math.PI*3/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI*3/4, 100, 0, Math.PI*3/4);
    });
    it('65 R Math.PI', () => {
      testEnemyShipRotation(enemyShip, (Math.PI*-1)+Math.PI/16, 100, 0, Math.PI);
    });
    it('66 R Math.PI/-4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI/-4, 100, 0, Math.PI/-4);
    });
    it('67 R Math.PI/-2', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-2, 100, 0, Math.PI/-2);
    });
    it('68 R Math.PI*-3/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI*-3/4, 100, 0, Math.PI*-3/4);
    });
    it('69 R Math.PI/-1', () => {
      testEnemyShipRotation(enemyShip, (Math.PI*-1)+Math.PI/16, 100, 0, Math.PI/-1);
    });
  });

  describe('Scenario 7 : Enemy ship x 100, y -100, rotation 0', () => {
    const enemyShip = repository.getById('ID-1')!;    
    it('71 R 0', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16, 100, -100, 0);
    });
    it('72 R Math.PI/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/4, 100, -100, Math.PI/4);
    });
    it('73 R Math.PI/2', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI/2, 100, -100, Math.PI/2);
    });
    it('74 R Math.PI*3/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/16+Math.PI*3/4, 100, -100, Math.PI*3/4);
    });
    it('75 R Math.PI', () => {
      testEnemyShipRotation(enemyShip, (Math.PI*-1)+Math.PI/16, 100, -100, Math.PI);
    });
    it('76 R Math.PI/-4', () => {
      testEnemyShipRotation(enemyShip, Math.PI/-16+Math.PI/-4, 100, -100, Math.PI/-4);
    });
    it('77 R Math.PI/-2', () => {
      testEnemyShipRotation(enemyShip,Math.PI/-2-Math.PI/16, 100, -100, Math.PI/-2);
    });
    it('78 R Math.PI*-3/4', () => {
      testEnemyShipRotation(enemyShip, Math.PI*-3/4, 100, -100, Math.PI*-3/4);
    });
    it('79 R Math.PI/-1', () => {
      testEnemyShipRotation(enemyShip, (Math.PI*-1)+Math.PI/16, 100, -100, Math.PI/-1);
    });
  });

  /*describe('Scenario : Enemy ship x0, y -100', () => {
    const enemyShip = repository.getById('ID-1')!;    
    it('should find a Math.PI/16 rotation', () => {
      enemyShip.x = 0;
      enemyShip.y = -100;
      enemyShip.rotation = 0;
      iaEnemyShip.onUpdate(500);
      expect(enemyShip.rotation).toBe(Math.PI/16);
    })
    it('should find a Math.PI/16+Math.PI/4 rotation', () => {
      enemyShip.x = 0;
      enemyShip.y = -100;
      enemyShip.rotation = Math.PI/4;
      iaEnemyShip.onUpdate(500);
      expect(enemyShip.rotation).toBe(Math.PI/16+Math.PI/4);
    })
  });
 
 it('should find a Math.PI*-3/4 rotation', () => {
    const enemyShip = repository.getById('ID-1')!;
    enemyShip.x = 100;
    enemyShip.y = -100;
    enemyShip.rotation = 0;
    iaEnemyShip.onUpdate(20000);
    expect(enemyShip.rotation).toBe(Math.PI*-3/4);
  });
  
  it('should find a Math.PI*-1 rotation', () => {
    const enemyShip = repository.getById('ID-1')!;
    enemyShip.x = 0;
    enemyShip.y = -100;
    enemyShip.rotation = 0;
    iaEnemyShip.onUpdate(20000);
    expect(enemyShip.rotation).toBe(Math.PI*-1);
  });

  it('should find a Math.PI*3/4 rotation', () => {
    const enemyShip = repository.getById('ID-1')!;
    enemyShip.x = -100;
    enemyShip.y = - 100;
    enemyShip.rotation = 0;
    iaEnemyShip.onUpdate(20000);
    expect(enemyShip.rotation).toBe(Math.PI*3/4);
  });

  it('should find a Math.PI/2 rotation', () => {
    const enemyShip = repository.getById('ID-1')!;
    enemyShip.x = -100;
    enemyShip.y = 0;
    enemyShip.rotation = 0;
    iaEnemyShip.onUpdate(20000);
    expect(enemyShip.rotation).toBe(Math.PI/2);
  });

  it('should find a Math.PI/4 rotation', () => {
    const enemyShip = repository.getById('ID-1')!;
    enemyShip.x = -100;
    enemyShip.y = 100;
    enemyShip.rotation = 0;
    iaEnemyShip.onUpdate(20000);
    expect(enemyShip.rotation).toBe(Math.PI/4);
  });

  it('should find a 0 rotation', () => {
    const enemyShip = repository.getById('ID-1')!;
    enemyShip.x = 0;
    enemyShip.y = 100;
    enemyShip.rotation = 0;
    iaEnemyShip.onUpdate(20000);
    expect(enemyShip.rotation).toBe(0);
  });

  it('should find a Math.PI*-1/4 rotation', () => {
    const enemyShip = repository.getById('ID-1')!;
    enemyShip.x = 100;
    enemyShip.y = 100;
    enemyShip.rotation = 0;
    iaEnemyShip.onUpdate(20000);
    expect(enemyShip.rotation).toBe(Math.PI*-1/4);
  });

  it('should find a Math.PI*-1/2 rotation', () => {
    const enemyShip = repository.getById('ID-1')!;
    enemyShip.x = 100;
    enemyShip.y = 0;
    enemyShip.rotation = 0;
    iaEnemyShip.onUpdate(20000);
    expect(enemyShip.rotation).toBe(Math.PI*-1/2);
  });*/

});