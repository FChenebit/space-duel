import { Game } from "phaser";
import { GameScene } from "./game-scene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-game',
  scale: {
    width:1600,
    height:1200,
    mode: Phaser.Scale.FIT,
  },
  backgroundColor: '#000000',
  scene: GameScene
};



const StartGame = (parent: string) => {

  return new Game({ ...config, parent });

}

export default StartGame;