import {Scene} from "phaser"
import type { IIDGenerator } from '../../core/ports/IIDGenerator';
import { FullSceneCoordinate, ITKSpriteManager } from "../game-interfaces/TKSpriteManagerInterface";

class CircleRepresentation {
  public graphic: Phaser.GameObjects.Graphics;
  public radius: number;
  public x: number;
  public y: number;
  public colorFill: number;
  constructor(newGraphic: Phaser.GameObjects.Graphics, newRadius: number,
    newX: number, newY: number, newColorFill: number){
    this.graphic = newGraphic;
    this.radius = newRadius;
    this.x = newX;
    this.y = newY;
    this.colorFill = newColorFill;
   }
}

class RectangleRepresentation {
  public graphic: Phaser.GameObjects.Graphics;
  public x: number;
  public y: number;
  public width:number;
  public height: number;
  public radius: number;
  public colorFill: number;
  constructor(newGraphic: Phaser.GameObjects.Graphics,
    newX: number, newY: number, newWidth: number, newHeight: number,
    newRadius: number, newColorFill: number) {
    this.graphic = newGraphic;
    this.x = newX;
    this.y = newY;
    this.width = newWidth;
    this.height = newHeight;
    this.radius = newRadius;
    this.colorFill = newColorFill;
  }
}


type Representation = Phaser.GameObjects.Image | CircleRepresentation | RectangleRepresentation;

export class TKSpriteManager implements ITKSpriteManager {

  private representationsById: Record<string, Representation >
  private idGenerator: IIDGenerator;
  private scene: Scene;

  constructor(newIDGenerator : IIDGenerator, 
        newScene: Scene) {
    this.representationsById = {};
    this.idGenerator = newIDGenerator;
    this.scene = newScene;
  }

  newSprite(newTextureName: string, newX: number, newY: number, newWidth :number,newHeight:number, newDepth?: number):string {
    const newId = this.idGenerator.generate();
    const newSprite = this.scene.add.image(newX,newY,newTextureName);
    newSprite.setOrigin(0.5,0.5);
    newSprite.setDisplaySize(newWidth, newHeight);
    if (typeof newDepth !== 'undefined') {
      newSprite.setDepth(newDepth);
    }

    this.representationsById[newId] = newSprite;

    return newId;

  }
  
  removeRepresentation(representationId: string): void {
    const representation = this.representationsById[representationId];
    if (representation instanceof Phaser.GameObjects.Image) {
      representation.destroy();
    }
    if (representation instanceof CircleRepresentation) {
      representation.graphic.destroy();
    }
    if (representation instanceof RectangleRepresentation) {
      representation.graphic.destroy();
    }
    delete this.representationsById[representationId];
  }

  newCircle(newX: number, newY: number, radius: number,colorFill: number): string {
    const newId = this.idGenerator.generate();
    const newGraphic = this.scene.add.graphics();
    newGraphic.fillStyle(colorFill, 1);
    newGraphic.fillCircle(newX, newY, radius);
    const newCircle = new CircleRepresentation(newGraphic,radius,newX,newY,colorFill);

    this.representationsById[newId] = newCircle;

    return newId;

  }

  newRectangle(newX: number, newY: number, newWidth: number, newHeight: number, newRadius: number, colorFill: number) {    
    const newId = this.idGenerator.generate();
    const newGraphic = this.scene.add.graphics();
    newGraphic.fillStyle(colorFill, 1);
    newGraphic.fillRoundedRect(newX - newWidth / 2, newY - newHeight / 2, newWidth, newHeight,newRadius);

    const newRectangle = new RectangleRepresentation(newGraphic, newX, newY, newWidth, newHeight, newRadius, colorFill);
    this.representationsById[newId] = newRectangle;
    return newId;
  }

  rotateRepresantationToAngle(representationId: string, newRotation: number): void {
    const representation = this.representationsById[representationId];
    if (representation instanceof Phaser.GameObjects.Image){
      representation.rotation = newRotation;
    }
  }

  moveRepresentationToXY(representationId:string, newX:number, newY:number):void {
    const representation = this.representationsById[representationId];
    if(representation instanceof Phaser.GameObjects.Image) {
      representation.x = newX;
      representation.y = newY;
      return;
    }
    if(representation instanceof CircleRepresentation) {
      representation.x = newX;
      representation.y = newY;
      representation.graphic.clear()
      representation.graphic.fillStyle(representation.colorFill, 1);
      representation.graphic.fillCircle(representation.x, representation.y, representation.radius);      
      return;
    }

    if (representation instanceof RectangleRepresentation) {
      representation.x = newX;
      representation.y = newY;
      representation.graphic.clear()
      representation.graphic.fillStyle(representation.colorFill, 1);
      representation.graphic.fillRoundedRect(representation.x - representation.width / 2,
        representation.y - representation.height / 2, representation.width, representation.height, representation.radius);
      return;
    }

    throw new Error('unknown representation type');
  }

  translateRepresentation(representationId: string, deltaX: number, deltaY: number) {
    const representation = this.representationsById[representationId];
    this.moveRepresentationToXY(representationId, representation.x + deltaX, representation.y + deltaY);
  }

  getRepresentationFullSceneCoordinate(representationId: string): FullSceneCoordinate {
    const representation = this.representationsById[representationId];
    if (representation instanceof Phaser.GameObjects.Image) {
      return { x: representation.x, y: representation.y, width: representation.width, height: representation.height };
    }
    if (representation instanceof CircleRepresentation) {
      return { x: representation.x, y: representation.y, width: representation.radius * 2, height: representation.radius * 2 };
    }
    if (representation instanceof RectangleRepresentation) {
      return { x: representation.x, y: representation.y, width: representation.width, height: representation.height };
    }
  
    throw new Error('unknown representation type');
  }

}