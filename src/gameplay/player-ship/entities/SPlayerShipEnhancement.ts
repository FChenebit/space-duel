export class SPlayerShipEnhancement {
  maxSpeed: number;
  acceleration: number;
  steering: number;
  laserCooldown: number;
  laserRange: number;
  laserSpeed: number;
  missileCooldown: number;
  missileRange: number;
  missileSpeed: number;
  missileSteering: number;
  landmineCooldown: number;
  landmineRange: number;
  landmineSpeed: number;
  landmineDetectionRange: number;

  constructor(
    newMaxSpeed: number,
    newAcceleration: number,
    newSteering: number,
    newLaserCooldown: number,
    newLaserRange: number,
    newLaserSpeed: number,
    newMissileCooldown: number,
    newMissileRange: number,
    newMissileSpeed: number,
    newMissileSteering: number,
    newlandmineCooldown: number,
    newLandmineRange: number,
    newLandmineSpeed: number,
    newLandmineDetectionRange: number
  )
  {
    this.maxSpeed = newMaxSpeed ;
    this.acceleration = newAcceleration;
    this.steering = newSteering;
    this.laserCooldown = newLaserCooldown;
    this.laserRange = newLaserRange;
    this.laserSpeed = newLaserSpeed;
    this.missileCooldown = newMissileCooldown;
    this.missileRange = newMissileRange;
    this.missileSpeed = newMissileSpeed;
    this.missileSteering = newMissileSteering;
    this.landmineCooldown = newlandmineCooldown;
    this.landmineRange = newLandmineRange;
    this.landmineSpeed = newLandmineSpeed;
    this.landmineDetectionRange = newLandmineDetectionRange;
    
  }
}