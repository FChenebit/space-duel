/* eslint-disable @typescript-eslint/no-unused-vars */
import { FixIDGenerator } from "../../../core/adapters/fix-id-generator";
import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { SFactionTypeEnum } from "../../../core/type/SFaction";
import { FullSceneCoordinate, ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { SProjectile, SProjectileTypeEnum } from "../../projectile/entity/SProjectile";
import { SWeapon } from "../entities/SWeapon";
import { SFireWeapon } from "./SFireWeapon";

class MockSpriteManager implements ITKSpriteManager {
  private spriteIdCounter = 0;

  newSprite(_newTextureName: string, _newX: number, _newY: number, _newWidth: number, _newHeight: number, _newDepth?: number): string {
    this.spriteIdCounter++;
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
}

class MockMovingObject {
  x: number;
  y: number;
  rotation: number;
  speed: number;

  constructor(x: number, y: number, rotation: number, speed: number) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.speed = speed;
  }
}

describe('SFireWeapon', () => {
  let idGenerator: FixIDGenerator;
  let spriteManager: MockSpriteManager;
  let projectileRepository: SIdentifiableRepository<SProjectile>;
  let weapon: SWeapon;
  let firer: MockMovingObject;
  let fireWeapon: SFireWeapon;

  beforeEach(() => {
    idGenerator = new FixIDGenerator();
    spriteManager = new MockSpriteManager();
    projectileRepository = new SIdentifiableRepository<SProjectile>();
    weapon = new SWeapon('weapon-1', 50, 1000, 1000, 200, SProjectileTypeEnum.LASER, SFactionTypeEnum.PLAYER);
    firer = new MockMovingObject(100, 200, Math.PI / 4, 150);
    fireWeapon = new SFireWeapon(idGenerator, spriteManager, projectileRepository, weapon, firer);
  });

  describe('execute', () => {
    it('should fire weapon when cooldown is zero', () => {
      // Arrange
      weapon.remainingTimeBeforeNextShot = 0;
      const initialProjectileCount = projectileRepository.count();

      // Act
      fireWeapon.execute();

      // Assert
      expect(projectileRepository.count()).toBe(initialProjectileCount + 1);
      expect(weapon.remainingTimeBeforeNextShot).toBe(weapon.cooldown);

      const createdProjectile = projectileRepository.getAll()[0];
      expect(createdProjectile).toBeDefined();
      expect(createdProjectile.id).toBe('ID-1');
      expect(createdProjectile.x).toBe(firer.x);
      expect(createdProjectile.y).toBe(firer.y);
      expect(createdProjectile.rotation).toBe(firer.rotation);
      expect(createdProjectile.faction).toBe(weapon.faction);
      expect(createdProjectile.type).toBe(weapon.projectileType);
      expect(createdProjectile.speed).toBe(weapon.projectileSpeed);
      expect(createdProjectile.representationId).toBe('sprite-1');
    });

    it('should fire weapon when cooldown is negative', () => {
      // Arrange
      weapon.remainingTimeBeforeNextShot = -100;
      const initialProjectileCount = projectileRepository.count();

      // Act
      fireWeapon.execute();

      // Assert
      expect(projectileRepository.count()).toBe(initialProjectileCount + 1);
      expect(weapon.remainingTimeBeforeNextShot).toBe(weapon.cooldown);
    });

    it('should not fire weapon when on cooldown', () => {
      // Arrange
      weapon.remainingTimeBeforeNextShot = 500; // Still cooling down
      const initialProjectileCount = projectileRepository.count();

      // Act
      fireWeapon.execute();

      // Assert
      expect(projectileRepository.count()).toBe(initialProjectileCount);
      expect(weapon.remainingTimeBeforeNextShot).toBe(500); // Unchanged
    });

    it('should create projectile with correct characteristics for LASER type', () => {
      // Arrange
      const laserWeapon = new SWeapon('laser-weapon', 50, 1000, 1000, 200, SProjectileTypeEnum.LASER, SFactionTypeEnum.PLAYER);
      const laserFireWeapon = new SFireWeapon(idGenerator, spriteManager, projectileRepository, laserWeapon, firer);
      laserWeapon.remainingTimeBeforeNextShot = 0;

      // Act
      laserFireWeapon.execute();

      // Assert
      const createdProjectile = projectileRepository.getAll()[0];
      expect(createdProjectile.type).toBe(SProjectileTypeEnum.LASER);
      expect(createdProjectile.faction).toBe(SFactionTypeEnum.PLAYER);
    });

    it('should create projectile with correct characteristics for MISSILE type', () => {
      // Arrange
      const missileWeapon = new SWeapon('missile-weapon', 50, 1000, 1000, 200, SProjectileTypeEnum.MISSILE, SFactionTypeEnum.PLAYER);
      const missileFireWeapon = new SFireWeapon(idGenerator, spriteManager, projectileRepository, missileWeapon, firer);
      missileWeapon.remainingTimeBeforeNextShot = 0;

      // Act
      missileFireWeapon.execute();

      // Assert
      const createdProjectile = projectileRepository.getAll()[0];
      expect(createdProjectile.type).toBe(SProjectileTypeEnum.MISSILE);
      expect(createdProjectile.faction).toBe(SFactionTypeEnum.PLAYER);
    });

    it('should create projectile with correct characteristics for MINE type', () => {
      // Arrange
      const mineWeapon = new SWeapon('mine-weapon', 50, 1000, 1000, 200, SProjectileTypeEnum.MINE, SFactionTypeEnum.PLAYER);
      const mineFireWeapon = new SFireWeapon(idGenerator, spriteManager, projectileRepository, mineWeapon, firer);
      mineWeapon.remainingTimeBeforeNextShot = 0;

      // Act
      mineFireWeapon.execute();

      // Assert
      const createdProjectile = projectileRepository.getAll()[0];
      expect(createdProjectile.type).toBe(SProjectileTypeEnum.MINE);
      expect(createdProjectile.faction).toBe(SFactionTypeEnum.PLAYER);
    });

    it('should handle multiple firings correctly', () => {
      // Arrange
      weapon.remainingTimeBeforeNextShot = 0;

      // Act - First firing
      fireWeapon.execute();
      const firstProjectile = projectileRepository.getAll()[0];

      // Reset cooldown for second firing
      weapon.remainingTimeBeforeNextShot = 0;
      fireWeapon.execute();
      const secondProjectile = projectileRepository.getAll()[1];

      // Assert
      expect(projectileRepository.count()).toBe(2);
      expect(firstProjectile.id).toBe('ID-1');
      expect(secondProjectile.id).toBe('ID-2');
      expect(firstProjectile.representationId).toBe('sprite-1');
      expect(secondProjectile.representationId).toBe('sprite-2');
    });

    it('should set correct cooldown after firing', () => {
      // Arrange
      weapon.remainingTimeBeforeNextShot = 0;
      const expectedCooldown = weapon.cooldown;

      // Act
      fireWeapon.execute();

      // Assert
      expect(weapon.remainingTimeBeforeNextShot).toBe(expectedCooldown);
    });

    it('should handle enemy faction weapons correctly', () => {
      // Arrange
      weapon = new SWeapon('enemy-weapon', 30, 800, 1200, 180, SProjectileTypeEnum.MISSILE, SFactionTypeEnum.ENEMY);
      fireWeapon = new SFireWeapon(idGenerator, spriteManager, projectileRepository, weapon, firer);
      weapon.remainingTimeBeforeNextShot = 0;

      // Act
      fireWeapon.execute();

      // Assert
      const createdProjectile = projectileRepository.getAll()[0];
      expect(createdProjectile.faction).toBe(SFactionTypeEnum.ENEMY);
    });
  });
});