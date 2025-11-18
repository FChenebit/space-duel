import { Game } from "phaser";
import { GameScene } from "./game-scene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-game',
  width: 800,
  height: 600,
  backgroundColor: '#2d2d2d',
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT
  },
  scene: GameScene
};



const StartGame = (parent: string) => {

  return new Game({ ...config, parent });

}

export default StartGame;