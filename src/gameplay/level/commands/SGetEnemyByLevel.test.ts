import { SGetEnemyByLevel } from './SGetEnemyByLevel'

describe('SGetEnemyByLevel', () => {

  let getEnemyByLevel: SGetEnemyByLevel;

  beforeEach(() => {
    getEnemyByLevel = new SGetEnemyByLevel();
  });

  it('should get enemy by level for level 1', () => {
    let enemyByLevel = getEnemyByLevel.execute(1);
    expect(enemyByLevel.droneCount).toBe(1);
    expect(enemyByLevel.preyCount).toBe(0);
    expect(enemyByLevel.hunterCount).toBe(0);
  });

  it('should get enemy by level for level 2', () => {
    let enemyByLevel = getEnemyByLevel.execute(2);
    expect(enemyByLevel.droneCount).toBe(0);
    expect(enemyByLevel.preyCount).toBe(1);
    expect(enemyByLevel.hunterCount).toBe(0);
  });

  it('should get enemy by level for level 3', () => {
    let enemyByLevel = getEnemyByLevel.execute(3);
    expect(enemyByLevel.droneCount).toBe(1);
    expect(enemyByLevel.preyCount).toBe(1);
    expect(enemyByLevel.hunterCount).toBe(0);
  });

    it('should get enemy by level for level 4', () => {
    let enemyByLevel = getEnemyByLevel.execute(4);
    expect(enemyByLevel.droneCount).toBe(0);
    expect(enemyByLevel.preyCount).toBe(0);
    expect(enemyByLevel.hunterCount).toBe(1);
  });

  it('should get enemy by level for level 5', () => {
    let enemyByLevel = getEnemyByLevel.execute(5);
    expect(enemyByLevel.droneCount).toBe(1);
    expect(enemyByLevel.preyCount).toBe(0);
    expect(enemyByLevel.hunterCount).toBe(1);
  });

  it('should get enemy by level for level 6', () => {
    let enemyByLevel = getEnemyByLevel.execute(6);
    expect(enemyByLevel.droneCount).toBe(1);
    expect(enemyByLevel.preyCount).toBe(1);
    expect(enemyByLevel.hunterCount).toBe(1);
  });

  it('should get enemy by level for level 7', () => {
    let enemyByLevel = getEnemyByLevel.execute(7);
    expect(enemyByLevel.droneCount).toBe(2);
    expect(enemyByLevel.preyCount).toBe(1);
    expect(enemyByLevel.hunterCount).toBe(1);
  });

  it('should get enemy by level for level 8', () => {
    let enemyByLevel = getEnemyByLevel.execute(8);
    expect(enemyByLevel.droneCount).toBe(1);
    expect(enemyByLevel.preyCount).toBe(2);
    expect(enemyByLevel.hunterCount).toBe(1);
  });

  it('should get enemy by level for level 9', () => {
    let enemyByLevel = getEnemyByLevel.execute(9);
    expect(enemyByLevel.droneCount).toBe(2);
    expect(enemyByLevel.preyCount).toBe(2);
    expect(enemyByLevel.hunterCount).toBe(1);
  });

  it('should get enemy by level for level 10', () => {
    let enemyByLevel = getEnemyByLevel.execute(10);
    expect(enemyByLevel.droneCount).toBe(1);
    expect(enemyByLevel.preyCount).toBe(1);
    expect(enemyByLevel.hunterCount).toBe(2);
  });

  it('should get enemy by level for level 11', () => {
    let enemyByLevel = getEnemyByLevel.execute(11);
    expect(enemyByLevel.droneCount).toBe(2);
    expect(enemyByLevel.preyCount).toBe(1);
    expect(enemyByLevel.hunterCount).toBe(2);
  });

  it('should get enemy by level for level 12', () => {
    let enemyByLevel = getEnemyByLevel.execute(12);
    expect(enemyByLevel.droneCount).toBe(2);
    expect(enemyByLevel.preyCount).toBe(2);
    expect(enemyByLevel.hunterCount).toBe(2);
  });

  it('should get enemy by level for level 13', () => {
    let enemyByLevel = getEnemyByLevel.execute(13);
    expect(enemyByLevel.droneCount).toBe(3);
    expect(enemyByLevel.preyCount).toBe(2);
    expect(enemyByLevel.hunterCount).toBe(2);
  });

  it('should get enemy by level for level 15', () => {
    let enemyByLevel = getEnemyByLevel.execute(15);
    expect(enemyByLevel.droneCount).toBe(3);
    expect(enemyByLevel.preyCount).toBe(3);
    expect(enemyByLevel.hunterCount).toBe(2);
  });

  it('should get enemy by level for level 18', () => {
    let enemyByLevel = getEnemyByLevel.execute(18);
    expect(enemyByLevel.droneCount).toBe(3);
    expect(enemyByLevel.preyCount).toBe(3);
    expect(enemyByLevel.hunterCount).toBe(3);
  });

  it('should get enemy by level for level 21', () => {
    let enemyByLevel = getEnemyByLevel.execute(21);
    expect(enemyByLevel.droneCount).toBe(4);
    expect(enemyByLevel.preyCount).toBe(4);
    expect(enemyByLevel.hunterCount).toBe(3);
  });

  it('should get enemy by level for level 24', () => {
    let enemyByLevel = getEnemyByLevel.execute(24);
    expect(enemyByLevel.droneCount).toBe(4);
    expect(enemyByLevel.preyCount).toBe(4);
    expect(enemyByLevel.hunterCount).toBe(4);
  });

  it('should get enemy by level for level 30', () => {
    let enemyByLevel = getEnemyByLevel.execute(30);
    expect(enemyByLevel.droneCount).toBe(5);
    expect(enemyByLevel.preyCount).toBe(5);
    expect(enemyByLevel.hunterCount).toBe(5);
  });

  it('should get enemy by level for level 34', () => {
    let enemyByLevel = getEnemyByLevel.execute(34);
    expect(enemyByLevel.droneCount).toBe(5);
    expect(enemyByLevel.preyCount).toBe(5);
    expect(enemyByLevel.hunterCount).toBe(6);
  });

  it('should get enemy by level for level 40', () => {
    let enemyByLevel = getEnemyByLevel.execute(40);
    expect(enemyByLevel.droneCount).toBe(6);
    expect(enemyByLevel.preyCount).toBe(6);
    expect(enemyByLevel.hunterCount).toBe(7);
  });

  it('should get enemy by level for level 50', () => {
    let enemyByLevel = getEnemyByLevel.execute(50);
    expect(enemyByLevel.droneCount).toBe(8);
    expect(enemyByLevel.preyCount).toBe(9);
    expect(enemyByLevel.hunterCount).toBe(8);
  });

})