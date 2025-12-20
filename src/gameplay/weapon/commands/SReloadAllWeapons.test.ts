import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { SFactionTypeEnum } from "../../../core/type/SFaction";
import { SProjectileTypeEnum } from "../../projectile/entity/SProjectile";
import { SWeapon } from "../entities/SWeapon";
import { SReloadAllWeapons } from "./SReloadAllWeapons";

describe('SReloadAllWeapons', () => {
  let weaponsRepository: SIdentifiableRepository<SWeapon>;
  let reloadAllWeapons: SReloadAllWeapons;

  beforeEach(() => {
    weaponsRepository = new SIdentifiableRepository<SWeapon>();
    reloadAllWeapons = new SReloadAllWeapons(weaponsRepository);
  });

  describe('constructor', () => {
    it('should store the weapons repository', () => {
      // Assert
      expect(reloadAllWeapons.weaponsRepository).toBe(weaponsRepository);
    });
  });

  describe('activate', () => {
    it('should call onUpdate with deltaTime from parameter', () => {
      // Arrange
      const deltaTime = 100;
      const parameter = { deltaTime };
      const onUpdateSpy = jest.spyOn(reloadAllWeapons, 'onUpdate');

      // Act
      reloadAllWeapons.activate(parameter);

      // Assert
      expect(onUpdateSpy).toHaveBeenCalledWith(deltaTime);
    });
  });

  describe('onUpdate', () => {
    it('should decrease remainingTimeBeforeNextShot for all weapons by deltaTime', () => {
      // Arrange
      const weapon1 = new SWeapon('weapon-1', 50, 1000, 1000, 200, SProjectileTypeEnum.LASER, SFactionTypeEnum.PLAYER);
      const weapon2 = new SWeapon('weapon-2', 30, 800, 1200, 180, SProjectileTypeEnum.MISSILE, SFactionTypeEnum.ENEMY);
      weapon1.remainingTimeBeforeNextShot = 500;
      weapon2.remainingTimeBeforeNextShot = 300;
      weaponsRepository.add(weapon1);
      weaponsRepository.add(weapon2);

      const deltaTime = 100;

      // Act
      reloadAllWeapons.onUpdate(deltaTime);

      // Assert
      expect(weapon1.remainingTimeBeforeNextShot).toBe(400);
      expect(weapon2.remainingTimeBeforeNextShot).toBe(200);
    });

    it('should clamp remainingTimeBeforeNextShot to 0 when it would go negative', () => {
      // Arrange
      const weapon = new SWeapon('weapon-1', 50, 1000, 1000, 200, SProjectileTypeEnum.LASER, SFactionTypeEnum.PLAYER);
      weapon.remainingTimeBeforeNextShot = 50;
      weaponsRepository.add(weapon);

      const deltaTime = 100; // Larger than remaining time

      // Act
      reloadAllWeapons.onUpdate(deltaTime);

      // Assert
      expect(weapon.remainingTimeBeforeNextShot).toBe(0);
    });

    it('should handle weapons that are already at 0 remainingTimeBeforeNextShot', () => {
      // Arrange
      const weapon = new SWeapon('weapon-1', 50, 1000, 1000, 200, SProjectileTypeEnum.LASER, SFactionTypeEnum.PLAYER);
      weapon.remainingTimeBeforeNextShot = 0;
      weaponsRepository.add(weapon);

      const deltaTime = 100;

      // Act
      reloadAllWeapons.onUpdate(deltaTime);

      // Assert
      expect(weapon.remainingTimeBeforeNextShot).toBe(0);
    });

    it('should handle weapons with negative remainingTimeBeforeNextShot', () => {
      // Arrange
      const weapon = new SWeapon('weapon-1', 50, 1000, 1000, 200, SProjectileTypeEnum.LASER, SFactionTypeEnum.PLAYER);
      weapon.remainingTimeBeforeNextShot = -50;
      weaponsRepository.add(weapon);

      const deltaTime = 100;

      // Act
      reloadAllWeapons.onUpdate(deltaTime);

      // Assert
      expect(weapon.remainingTimeBeforeNextShot).toBe(0);
    });

    it('should handle empty weapons repository', () => {
      // Arrange
      const deltaTime = 100;

      // Act & Assert - should not throw any errors
      expect(() => reloadAllWeapons.onUpdate(deltaTime)).not.toThrow();
      expect(weaponsRepository.count()).toBe(0);
    });

    it('should handle multiple weapons with different cooldown states', () => {
      // Arrange
      const weapon1 = new SWeapon('weapon-1', 50, 1000, 1000, 200, SProjectileTypeEnum.LASER, SFactionTypeEnum.PLAYER);
      const weapon2 = new SWeapon('weapon-2', 30, 800, 1200, 180, SProjectileTypeEnum.MISSILE, SFactionTypeEnum.ENEMY);
      const weapon3 = new SWeapon('weapon-3', 40, 900, 1100, 190, SProjectileTypeEnum.MINE, SFactionTypeEnum.PLAYER);

      weapon1.remainingTimeBeforeNextShot = 500;
      weapon2.remainingTimeBeforeNextShot = 0;
      weapon3.remainingTimeBeforeNextShot = -100;

      weaponsRepository.add(weapon1);
      weaponsRepository.add(weapon2);
      weaponsRepository.add(weapon3);

      const deltaTime = 150;

      // Act
      reloadAllWeapons.onUpdate(deltaTime);

      // Assert
      expect(weapon1.remainingTimeBeforeNextShot).toBe(350);
      expect(weapon2.remainingTimeBeforeNextShot).toBe(0);
      expect(weapon3.remainingTimeBeforeNextShot).toBe(0);
    });

    it('should handle errors gracefully and log them', () => {
      // Arrange
      const weapon = new SWeapon('weapon-1', 50, 1000, 1000, 200, SProjectileTypeEnum.LASER, SFactionTypeEnum.PLAYER);
      weapon.remainingTimeBeforeNextShot = 100;
      weaponsRepository.add(weapon);

      // Mock console.error to capture error logs
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Make getAll throw an error
      const getAllSpy = jest.spyOn(weaponsRepository, 'getAll').mockImplementation(() => {
        throw new Error('Test error');
      });

      const deltaTime = 50;

      // Act
      reloadAllWeapons.onUpdate(deltaTime);

      // Assert
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error reloading all weapons: Error: Test error');

      // Cleanup
      consoleErrorSpy.mockRestore();
      getAllSpy.mockRestore();
    });

    it('should handle deltaTime of 0', () => {
      // Arrange
      const weapon = new SWeapon('weapon-1', 50, 1000, 1000, 200, SProjectileTypeEnum.LASER, SFactionTypeEnum.PLAYER);
      weapon.remainingTimeBeforeNextShot = 100;
      weaponsRepository.add(weapon);

      const deltaTime = 0;

      // Act
      reloadAllWeapons.onUpdate(deltaTime);

      // Assert
      expect(weapon.remainingTimeBeforeNextShot).toBe(100); // Unchanged
    });

    it('should handle very large deltaTime values', () => {
      // Arrange
      const weapon = new SWeapon('weapon-1', 50, 1000, 1000, 200, SProjectileTypeEnum.LASER, SFactionTypeEnum.PLAYER);
      weapon.remainingTimeBeforeNextShot = 100;
      weaponsRepository.add(weapon);

      const deltaTime = Number.MAX_SAFE_INTEGER;

      // Act
      reloadAllWeapons.onUpdate(deltaTime);

      // Assert
      expect(weapon.remainingTimeBeforeNextShot).toBe(0);
    });
  });
});