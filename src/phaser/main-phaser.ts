import { Game } from "phaser";
import { GameScene } from "./game-scene";
import { SPlayerShipEnhancement } from "../gameplay/player-ship/entities/SPlayerShipEnhancement";

/*const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-game',
  scale: {
    width:1600,
    height:1200,
    mode: Phaser.Scale.FIT,
  },
  backgroundColor: '#000000',
  scene: GameScene
};*/



const StartGame = (parent: string, level: number, playerEnhancement: SPlayerShipEnhancement) => {

  //console.log('level in StartGame ' + level);

  const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-game',
  scale: {
    width:1600,
    height:1200,
    mode: Phaser.Scale.FIT,
  },
  backgroundColor: '#000000',
  scene: new GameScene(level,playerEnhancement)
};


  return new Game({ ...config, parent });

}

export default StartGame;