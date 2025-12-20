/* eslint-disable @typescript-eslint/no-unused-vars */
import { FixIDGenerator } from "../../../core/adapters/fix-id-generator";
import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { SFactionTypeEnum } from "../../../core/type/SFaction";
import { FullSceneCoordinate, ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { SProjectile, SProjectileTypeEnum } from "../../projectile/entity/SProjectile";
import { SWeapon } from "../../weapon/entities/SWeapon";
import { ENEMYSHIP_HEIGHT, ENEMYSHIP_WIDTH, SEnemyShip, SEnemyShipTypeEnum } from "../entities/SEnemyShip";
import { SNewEnemyShip } from "./SNewEnemyShip";

class MockSpriteManager implements ITKSpriteManager {
  private spriteIdCounter = 0;
  private lastNewSpriteCall: { textureName: string; x: number; y: number; width: number; height: number } | null = null;

  newSprite(newTextureName: string, newX: number, newY: number, newWidth: number, newHeight: number, _newDepth?: number): string {
    this.spriteIdCounter++;
    this.lastNewSpriteCall = { textureName: newTextureName, x: newX, y: newY, width: newWidth, height: newHeight };
    return `sprite-${this.spriteIdCounter}`;
  }

  removeRepresentation(_representationId: string): void {
    // Mock implementation - do nothing
  }

  moveRepresentationToXY(_representationId: string, _newX: number, _newY: number): void {
    // Mock implementation - do nothing
  }

  translateRepresentation(_representationId: string, _deltaX: number, _deltaY: number): void {
    // Mock implementation - do nothing
  }

  rotateRepresantationToAngle(_representationId: string, _newRotation: number): void {
    // Mock implementation - do nothing
  }

  newCircle(_newX: number, _newY: number, _radius: number, _colorFill: number): string {
    this.spriteIdCounter++;
    return `circle-${this.spriteIdCounter}`;
  }

  getRepresentationFullSceneCoordinate(_representationId: string): FullSceneCoordinate {
    return { x: 0, y: 0, width: 10, height: 10 };
  }

  newRectangle(_newX: number, _newY: number, _newWidth: number, _newHeight: number, _radius: number, _colorFill: number): string {
    this.spriteIdCounter++;
    return `rectangle-${this.spriteIdCounter}`;
  }

  getLastNewSpriteCall() {
    return this.lastNewSpriteCall;
  }
}

describe('SNewEnemyShip', () => {
  let enemyShipRepository: SIdentifiableRepository<SEnemyShip>;
  let idGenerator: FixIDGenerator;
  let spriteManager: MockSpriteManager;
  let weaponRepository: SIdentifiableRepository<SWeapon>;
  let projectileRepository: SIdentifiableRepository<SProjectile>;
  let newEnemyShip: SNewEnemyShip;

  beforeEach(() => {
    enemyShipRepository = new SIdentifiableRepository<SEnemyShip>();
    idGenerator = new FixIDGenerator();
    spriteManager = new MockSpriteManager();
    weaponRepository = new SIdentifiableRepository<SWeapon>();
    projectileRepository = new SIdentifiableRepository<SProjectile>();
    newEnemyShip = new SNewEnemyShip(
      enemyShipRepository,
      idGenerator,
      spriteManager,
      weaponRepository,
      projectileRepository
    );
  });

  describe('constructor', () => {
    it('should create SNewEnemyShip instance with all dependencies', () => {
      expect(newEnemyShip).toBeDefined();
      expect(newEnemyShip.enemyShipRepository).toBe(enemyShipRepository);
      expect(newEnemyShip.idGenerator).toBe(idGenerator);
      expect(newEnemyShip.spriteManager).toBe(spriteManager);
    });
  });

  describe('execute', () => {
    it('should create enemy ship with HUNTER type and add it to repository', () => {
      // Arrange
      const initialX = 100;
      const initialY = 200;
      const speed = 150;
      const steering = Math.PI / 8;
      const type = SEnemyShipTypeEnum.HUNTER;

      // Act
      newEnemyShip.execute(initialX, initialY, speed, steering, type);

      // Assert
      expect(enemyShipRepository.count()).toBe(1);
      const createdEnemyShip = enemyShipRepository.getById('ID-1');
      expect(createdEnemyShip).toBeDefined();
      expect(createdEnemyShip!.id).toBe('ID-1');
      expect(createdEnemyShip!.x).toBe(initialX);
      expect(createdEnemyShip!.y).toBe(initialY);
      expect(createdEnemyShip!.speed).toBe(speed);
      expect(createdEnemyShip!.steering).toBe(steering);
      expect(createdEnemyShip!.type).toBe(type);
      expect(createdEnemyShip!.rotation).toBe(0);
      expect(createdEnemyShip!.representationId).toBe('sprite-1');
    });

    it('should create enemy ship with DRONE type', () => {
      // Arrange
      const initialX = 50;
      const initialY = 75;
      const speed = 100;
      const steering = Math.PI / 4;
      const type = SEnemyShipTypeEnum.DRONE;

      // Act
      newEnemyShip.execute(initialX, initialY, speed, steering, type);

      // Assert
      expect(enemyShipRepository.count()).toBe(1);
      const createdEnemyShip = enemyShipRepository.getById('ID-1');
      expect(createdEnemyShip!.type).toBe(SEnemyShipTypeEnum.DRONE);
    });

    it('should create enemy ship with PREY type', () => {
      // Arrange
      const initialX = 300;
      const initialY = 400;
      const speed = 200;
      const steering = Math.PI / 2;
      const type = SEnemyShipTypeEnum.PREY;

      // Act
      newEnemyShip.execute(initialX, initialY, speed, steering, type);

      // Assert
      expect(enemyShipRepository.count()).toBe(1);
      const createdEnemyShip = enemyShipRepository.getById('ID-1');
      expect(createdEnemyShip!.type).toBe(SEnemyShipTypeEnum.PREY);
    });

    it('should create sprite with correct parameters', () => {
      // Arrange
      const initialX = 150;
      const initialY = 250;
      const type = SEnemyShipTypeEnum.HUNTER;

      // Act
      newEnemyShip.execute(initialX, initialY, 100, 0, type);

      // Assert
      const lastSpriteCall = spriteManager.getLastNewSpriteCall();
      expect(lastSpriteCall).toBeDefined();
      expect(lastSpriteCall!.textureName).toBe(type.toString());
      expect(lastSpriteCall!.x).toBe(initialX);
      expect(lastSpriteCall!.y).toBe(initialY);
      expect(lastSpriteCall!.width).toBe(ENEMYSHIP_WIDTH);
      expect(lastSpriteCall!.height).toBe(ENEMYSHIP_HEIGHT);
    });

    it('should create three weapons (laser, missile, mine) and add them to weapon repository', () => {
      // Arrange
      const initialX = 0;
      const initialY = 0;

      // Act
      newEnemyShip.execute(initialX, initialY, 100, 0, SEnemyShipTypeEnum.HUNTER);

      // Assert
      expect(weaponRepository.count()).toBe(3);

      const weapons = weaponRepository.getAll();
      expect(weapons).toHaveLength(3);

      // Check laser weapon
      const laserWeapon = weapons.find(w => w.projectileType === SProjectileTypeEnum.LASER);
      expect(laserWeapon).toBeDefined();
      expect(laserWeapon!.damage).toBe(100);
      expect(laserWeapon!.range).toBe(20000);
      expect(laserWeapon!.cooldown).toBe(1000);
      expect(laserWeapon!.projectileSpeed).toBe(200);
      expect(laserWeapon!.faction).toBe(SFactionTypeEnum.ENEMY);

      // Check missile weapon
      const missileWeapon = weapons.find(w => w.projectileType === SProjectileTypeEnum.MISSILE);
      expect(missileWeapon).toBeDefined();
      expect(missileWeapon!.damage).toBe(100);
      expect(missileWeapon!.range).toBe(20000);
      expect(missileWeapon!.cooldown).toBe(2000);
      expect(missileWeapon!.projectileSpeed).toBe(200);
      expect(missileWeapon!.faction).toBe(SFactionTypeEnum.ENEMY);

      // Check mine weapon
      const mineWeapon = weapons.find(w => w.projectileType === SProjectileTypeEnum.MINE);
      expect(mineWeapon).toBeDefined();
      expect(mineWeapon!.damage).toBe(100);
      expect(mineWeapon!.range).toBe(20000);
      expect(mineWeapon!.cooldown).toBe(5000);
      expect(mineWeapon!.projectileSpeed).toBe(200);
      expect(mineWeapon!.faction).toBe(SFactionTypeEnum.ENEMY);
    });

    it('should create fire weapon commands and add missile command to enemy ship', () => {
      // Arrange
      const initialX = 0;
      const initialY = 0;

      // Act
      newEnemyShip.execute(initialX, initialY, 100, 0, SEnemyShipTypeEnum.HUNTER);

      // Assert
      const createdEnemyShip = enemyShipRepository.getById('ID-1');
      expect(createdEnemyShip!.fireWeaponsCommands).toHaveLength(1); // Only missile is added based on the code

      const fireCommand = createdEnemyShip!.fireWeaponsCommands[0];
      expect(fireCommand).toBeDefined();
      expect(fireCommand.idGenerator).toBe(idGenerator);
      expect(fireCommand.spriteManager).toBe(spriteManager);
      expect(fireCommand.projectileRepository).toBe(projectileRepository);
      expect(fireCommand.firer).toBe(createdEnemyShip);
    });

    it('should handle multiple enemy ship creations with different IDs', () => {
      // Act - First enemy ship
      newEnemyShip.execute(0, 0, 100, 0, SEnemyShipTypeEnum.HUNTER);
      const firstEnemyShip = enemyShipRepository.getById('ID-1');

      // Create separate repositories and new instance for second enemy ship
      const enemyShipRepository2 = new SIdentifiableRepository<SEnemyShip>();
      const weaponRepository2 = new SIdentifiableRepository<SWeapon>();
      const projectileRepository2 = new SIdentifiableRepository<SProjectile>();
      const idGenerator2 = new FixIDGenerator();
      const newEnemyShip2 = new SNewEnemyShip(
        enemyShipRepository2,
        idGenerator2,
        spriteManager,
        weaponRepository2,
        projectileRepository2
      );

      // Act - Second enemy ship
      newEnemyShip2.execute(100, 100, 150, Math.PI / 4, SEnemyShipTypeEnum.DRONE);
      const secondEnemyShip = enemyShipRepository2.getById('ID-1'); // Second generator starts with ID-1 again

      // Assert
      expect(enemyShipRepository.count()).toBe(1); // First repository still has 1
      expect(enemyShipRepository2.count()).toBe(1); // Second repository has 1
      expect(firstEnemyShip).toBeDefined();
      expect(secondEnemyShip).toBeDefined();
      expect(firstEnemyShip!.id).toBe('ID-1');
      expect(secondEnemyShip!.id).toBe('ID-1'); // Different repository, same ID from fresh generator
      expect(firstEnemyShip!.type).toBe(SEnemyShipTypeEnum.HUNTER);
      expect(secondEnemyShip!.type).toBe(SEnemyShipTypeEnum.DRONE);
    });

    it('should initialize fireWeaponsCommands array as empty and then populate it', () => {
      // Arrange
      const initialX = 50;
      const initialY = 50;

      // Act
      newEnemyShip.execute(initialX, initialY, 120, Math.PI / 6, SEnemyShipTypeEnum.PREY);

      // Assert
      const createdEnemyShip = enemyShipRepository.getById('ID-1');
      expect(createdEnemyShip!.fireWeaponsCommands).toBeDefined();
      expect(Array.isArray(createdEnemyShip!.fireWeaponsCommands)).toBe(true);
      expect(createdEnemyShip!.fireWeaponsCommands.length).toBeGreaterThan(0);
    });
  });
});