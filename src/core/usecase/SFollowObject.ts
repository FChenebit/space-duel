import { ISMovingObject } from "../ports/ISMovingObject";

export class SFollowObject {

  normalizeAngle(angle: number): number {
    if(angle >= Math.PI) {
      angle = angle - (2*Math.PI);
    }
    if(angle < -1 * Math.PI) {
      angle = angle + (2*Math.PI);
    }
    return angle;
  }

  setSteering(movingObject: ISMovingObject, targetRotation:number, deltaTime: number): void {
    
    if(this.normalizeAngle(movingObject.rotation) ===  this.normalizeAngle(targetRotation)) {
      targetRotation = movingObject.rotation; // case where target = -PI and rotation = PI or target = PI and rotation = -PI
    }
    if(targetRotation === Math.PI && movingObject.rotation < 0) {
      targetRotation = -Math.PI;
    }
    if(targetRotation === -Math.PI && movingObject.rotation > 0) {
      targetRotation = Math.PI;
    }
    if (movingObject.rotation !== targetRotation) {
      let positiveSteeringAngle = targetRotation - movingObject.rotation;
      positiveSteeringAngle = (positiveSteeringAngle < 0 ? positiveSteeringAngle + (Math.PI * 2) : positiveSteeringAngle);
      const negativeSteeringAngle = -1 * ((Math.PI * 2) - positiveSteeringAngle);
      const steeringDirection = (Math.abs(negativeSteeringAngle) < positiveSteeringAngle ? -1 : 1);
      const steering = Math.min(movingObject.steering,Math.abs(movingObject.rotation - targetRotation))*steeringDirection*deltaTime/1000;
      movingObject.rotation += steering;
      movingObject.rotation = this.normalizeAngle(movingObject.rotation);
    }
  }

  computeRotation(movingObject: ISMovingObject, targetObject: ISMovingObject): number {

    const distanceX = movingObject.x - targetObject.x;
    const distanceY = movingObject.y - targetObject.y;

    const angleAxeXToEP =  Math.atan2(distanceY,distanceX*-1)*-1;
    let targetRotation = 0;
    targetRotation = angleAxeXToEP + Math.PI/2;
    targetRotation = this.normalizeAngle(targetRotation);
    return targetRotation;
  }
}
