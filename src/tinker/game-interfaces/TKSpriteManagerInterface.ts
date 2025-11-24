export type FullSceneCoordinate = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ITKSpriteManager {
  newSprite(newTextureName: string, newX: number, newY: number, newWidth: number, newHeight: number, newDepth?: number): string;
  removeRepresentation(representationId: string): void;
  moveRepresentationToXY(representationId: string, newX: number, newY: number): void;
  translateRepresentation(representationId: string, deltaX: number, deltaY: number):void;
  rotateRepresantationToAngle(representationId: string, newRotation: number): void;
  newCircle(newX: number, newY: number, radius: number, colorFill: number): string;
  getRepresentationFullSceneCoordinate(representationId: string): FullSceneCoordinate;
  newRectangle(newX: number, newY: number, newWidth: number, newHeight: number, radius: number, colorFill: number): string;
}