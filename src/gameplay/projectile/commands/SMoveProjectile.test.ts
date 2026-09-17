import { FixIDGenerator } from "../../../core/adapters/fix-id-generator";
import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { SFactionTypeEnum } from "../../../core/type/SFaction";
import { SNewEnemyShip } from "../../enemy-ship/commands/SNewEnemyShip";
import { SEnemyShip, SEnemyShipTypeEnum } from "../../enemy-ship/entities/SEnemyShip";
import { SPlayerShipRepository } from "../../player-ship/adapters/SPlayerShipRepository";
import { SPlayerShip } from "../../player-ship/entities/SPlayerShip";
import { SWeapon } from "../../weapon/entities/SWeapon";
import { SProjectile, SProjectileTypeEnum } from "../entity/SProjectile";
import { SMoveProjectile } from "./SMoveProjectile";
import { TestSpriteManager } from "../../../mockups/adapters/TestSpriteManager";
//import { IIDGenerator } from "../../../core/ports/IIDGenerator";


describe('SMoveProjectile', () => {

  const projectileRepository = new SIdentifiableRepository<SProjectile>();
  const enemyShipRepository = new SIdentifiableRepository<SEnemyShip>();
  const newEnemyShip = new SNewEnemyShip(enemyShipRepository, new FixIDGenerator(),new TestSpriteManager(), new SIdentifiableRepository<SWeapon>(),
       projectileRepository);
  newEnemyShip.execute(0,200,0,Math.PI/8,SEnemyShipTypeEnum.HUNTER);
  
  const playerRepository = new SPlayerShipRepository();
  const newPlayerShip = new SPlayerShip(0, 0, 'TFC',0,0,0,0,0,
      new SWeapon('1', 100, 20000, 10, 200, SProjectileTypeEnum.LASER, SFactionTypeEnum.PLAYER),
      new SWeapon('2', 100, 20000, 10, 200, SProjectileTypeEnum.MISSILE, SFactionTypeEnum.PLAYER),
      new SWeapon('3', 100, 20000, 10, 200, SProjectileTypeEnum.MINE, SFactionTypeEnum.PLAYER));
  playerRepository.setPlayerShip(newPlayerShip);
  const fixIdGenerator = new FixIDGenerator();
  const moveProjectile = new SMoveProjectile(projectileRepository,enemyShipRepository,playerRepository);



  /*créer des projectiles et les ajouter au repo puis les faire bouger et vérifier que tout va bien . la vrai 
  difficulté à tester c'est pour le missible */

  describe('Testing Moving a Laser from player', () => {

      it('should move up', () => {
    
        const playerLaserProjectile = new SProjectile(fixIdGenerator.generate(), newPlayerShip.x + 100,
          newPlayerShip.y,fixIdGenerator.generate(), 10,Math.PI/2,SFactionTypeEnum.PLAYER,SProjectileTypeEnum.LASER);
        projectileRepository.add(playerLaserProjectile);      
        moveProjectile.activate({deltaTime:500});
        expect(playerLaserProjectile.x).toBe(newPlayerShip.x+105);
        expect(playerLaserProjectile.y).toBeCloseTo(newPlayerShip.y);
      });

  });

  describe('Testing Moving a missile from enemy', () => {
    it('should get closer to player',() => {
      const enemyMissileProjectile = new SProjectile(fixIdGenerator.generate(),newPlayerShip.x+100,
        newPlayerShip.y+100,fixIdGenerator.generate(),10,Math.PI/2,SFactionTypeEnum.ENEMY,
        SProjectileTypeEnum.MISSILE);
      projectileRepository.add(enemyMissileProjectile);
      moveProjectile.activate({deltaTime:500});
      expect(enemyMissileProjectile.rotation).toBe(Math.PI/2-Math.PI/16);
      expect(enemyMissileProjectile.x).toBe(newPlayerShip.x + 100 + (-5 * Math.cos(enemyMissileProjectile.rotation+Math.PI/2)));
      expect(enemyMissileProjectile.y).toBe(newPlayerShip.y + 100 + (-5 * Math.sin(enemyMissileProjectile.rotation+Math.PI/2)));
    });
  });

  describe('Testing a moving missile from playership with 2 enemies', () => {
    it('should get closer to closest enemy', () => {
      newEnemyShip.execute(0,500,0,Math.PI/8,SEnemyShipTypeEnum.HUNTER);
      console.log('after creating enemy ship');
      const playerMissileProjectile = new SProjectile(fixIdGenerator.generate(),0,
        400,fixIdGenerator.generate(),10,Math.PI/2,SFactionTypeEnum.PLAYER,
        SProjectileTypeEnum.MISSILE);
      projectileRepository.add(playerMissileProjectile);
      moveProjectile.activate({deltaTime:500});
      expect(playerMissileProjectile.rotation).toBe(Math.PI/2+Math.PI/16);
      expect(playerMissileProjectile.x).toBe(0 + (-5 * Math.cos(playerMissileProjectile.rotation+Math.PI/2)));
      expect(playerMissileProjectile.y).toBe(400 + (-5 * Math.sin(playerMissileProjectile.rotation+Math.PI/2)));

    });
  });
})