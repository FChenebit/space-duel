import playerImage from '../assets/red_01.png';

export class GameScene extends Phaser.Scene {
  player!: Phaser.GameObjects.Image;

  constructor() {
    super({key:'GameScence'});
  }


  preload() {
    this.load.image('player', playerImage);
  }

  create() {
    this.player  = this.add.image(50,50,'player');
    const text = this.add.text(400, 300, 'Hello Phaser!', {
      fontSize: '32px',
      color: '#ffffff'
    })
    text.setOrigin(0.5, 0.5);

  }

  update() {
    this.player.angle += 1;
  }
}