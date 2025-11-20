import { ISMovingObject } from "../ports/ISMovingObject";

export class SMoveObject {
  moveObject(movingObject: ISMovingObject, deltaTime: number): {deltaX: number, deltaY: number} {
    const movement = movingObject.speed * deltaTime / 1000;
    // -1 because the coordinate turn in clockwise direction, so we need to move in the opposite direction
    const deltaX = Math.cos(movingObject.rotation + Math.PI / 2) * movement * -1;
    const deltaY = Math.sin(movingObject.rotation + Math.PI/2) * movement * -1;
    movingObject.x += deltaX;
    movingObject.y += deltaY;
    return {deltaX, deltaY};
  }   
}
