import { FullSceneCoordinate, ITKSpriteManager } from "../../tinker/game-interfaces/TKSpriteManagerInterface";

export class TestSpriteManager implements ITKSpriteManager {
    
    newSprite(_newTextureName: string, _newX: number, _newY: number, _newWidth: number, _newHeight: number, _newDepth?: number): string {
      //console.log('creating an enemyShip');
      return 'ID-2';
    }
    newText(_newText:string, _newX:number, _newY:number, 
      _newStyle:Phaser.Types.GameObjects.Text.TextStyle):string {
      throw new Error("Method not implemented.");
    }

    changeRepresentationText(_representationId: string, _newText: string): void {
      throw new Error("Method not implemented.");
    }

    removeRepresentation(_representationId: string): void {
      throw new Error("Method not implemented.");
    }
    moveRepresentationToXY(_representationId: string, _newX: number, _newY: number): void {
      throw new Error("Method not implemented.");
    }
    translateRepresentation(_representationId: string, _deltaX: number, _deltaY: number): void {
      throw new Error("Method not implemented.");
    }
    rotateRepresantationToAngle(_representationId: string, _newRotation: number): void {
      throw new Error("Method not implemented.");
    }
    newCircle(_newX: number, _newY: number, _radius: number, _colorFill: number): string {
      throw new Error("Method not implemented.");
    }
    getRepresentationFullSceneCoordinate(_representationId: string): FullSceneCoordinate {
      return { x: 0, y: 0, width: 10, height: 10 };
    }
    newRectangle(_newX: number, _newY: number, _newWidth: number, _newHeight: number, _radius: number, _colorFill: number): string {
      throw new Error("Method not implemented.");
    }
    
  }
