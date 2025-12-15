import { SIdentifiableRepository } from "../../../core/adapters/SIdentifiableRepository";
import { SMoveObject } from "../../../core/usecase/SMoveObject";
import { ITKUpdateControllerCallback } from "../../../tinker/game-interfaces/TKUpdateControllerCallbackInterface";
import { SProjectile } from "../entity/SProjectile";

export interface SMoveProjectileParameter {
  deltaTime: number;
}

export class SMoveProjectile implements ITKUpdateControllerCallback {
  projectileRepository: SIdentifiableRepository<SProjectile>;
  moveProjectile: SMoveObject;
  elapsedTime: number;
  constructor(newProjectileRepository: SIdentifiableRepository<SProjectile>) {
    this.projectileRepository = newProjectileRepository;
    this.moveProjectile = new SMoveObject();
    this.elapsedTime = 0;
  }
  async activate(parameter: object): Promise<void> {
    const params = parameter as SMoveProjectileParameter;
    this.onUpdate(params.deltaTime);
  }

  onUpdate(deltaTime: number): void {
    this.projectileRepository.getAll().forEach((projectile: SProjectile) => {
      this.moveProjectile.moveObject(projectile, deltaTime);
    });
    /*this.elapsedTime += deltaTime;
    if(this.elapsedTime > 10000) {
      this.elapsedTime = 0;
      console.log('projectile count ' + this.projectileRepository.count());
    }*/
  }
}