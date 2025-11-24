export interface ISPlayerShipMoveCallback{
  onPlayerShipMove(newXPlayerShip: number, newYPlayerShip: number,
    deltaX: number, deltaY : number): void;
}