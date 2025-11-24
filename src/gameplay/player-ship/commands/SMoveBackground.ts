import { ITKSpriteManager } from "../../../tinker/game-interfaces/TKSpriteManagerInterface";
import { ISPlayerShipMoveCallback } from "../interface/SPlayerShipMoveCallback";

const backgroundWidth = 1700;
const backgroundHeigth = 1300;

export class SMoveBackground implements ISPlayerShipMoveCallback {

  representationsId: string[];
  spriteManager: ITKSpriteManager;
  sceneWidth: number;
  sceneHeight: number;

  constructor(spriteManager: ITKSpriteManager,sceneWidth : number, sceneHeight : number) {
    this.representationsId = [];
    this.sceneWidth = sceneWidth;
    this.sceneHeight = sceneHeight;
    const background1RepresentationId = spriteManager.newSprite(
      'Background1', (backgroundWidth / 2 * -1) + sceneWidth / 2, (backgroundHeigth / 2 * -1) + sceneHeight / 2,
      backgroundWidth, backgroundHeigth,-1);
    this.representationsId.push(background1RepresentationId);
    const background2RepresentationId = spriteManager.newSprite(
      'Background2', (backgroundWidth / 2 * -1) + sceneWidth / 2, (backgroundHeigth / 2) + sceneHeight / 2,
      backgroundWidth, backgroundHeigth,-1);
    this.representationsId.push(background2RepresentationId);
    const background3RepresentationId = spriteManager.newSprite(
      'Background3', (backgroundWidth / 2) + sceneWidth / 2, (backgroundHeigth / 2) + sceneHeight / 2,
      backgroundWidth, backgroundHeigth,-1);
    this.representationsId.push(background3RepresentationId);
    const background4RepresentationId = spriteManager.newSprite(
      'Background4', (backgroundWidth / 2) + sceneWidth / 2, (backgroundHeigth / 2 * -1) + sceneHeight / 2,
      backgroundWidth, backgroundHeigth,-1);
    this.representationsId.push(background4RepresentationId);

    this.spriteManager = spriteManager;
  }

  onPlayerShipMove(_newXPlayerShip: number, _newYPlayerShip: number,
    deltaX: number, deltaY : number) {
    this.representationsId.forEach((representationId) => {
      this.spriteManager.translateRepresentation(representationId, deltaX * -1, deltaY * -1);
      const backgroundCoordinate = this.spriteManager.getRepresentationFullSceneCoordinate(representationId);
      if ((backgroundCoordinate.x - backgroundWidth / 2) > this.sceneWidth && deltaX < 0) {
        this.spriteManager.translateRepresentation(representationId,backgroundWidth * -2, 0);
      }
      if ((backgroundCoordinate.y - backgroundHeigth / 2) > this.sceneHeight && deltaY < 0) {
        this.spriteManager.translateRepresentation(representationId,0, backgroundHeigth * -2);
      }
      if ((backgroundCoordinate.x + backgroundWidth / 2) < 0 && deltaX > 0) {
        this.spriteManager.translateRepresentation(representationId,backgroundWidth * 2, 0);
      }
      if ((backgroundCoordinate.y + backgroundHeigth / 2) < 0 && deltaY > 0) {
        this.spriteManager.translateRepresentation(representationId,0, backgroundHeigth * 2);
      }
    })
  }
  
}