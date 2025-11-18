import { useEffect, useRef } from 'react';
import StartGame from './phaser/main-phaser'

const Game = () => {
  const gameRef = useRef<Phaser.Game | null>(null)

    // Initialize Phaser game
  useEffect(() => {
      gameRef.current = StartGame('phaser-game')
  
      // Cleanup function
      return () => {
        if (gameRef.current) {
          gameRef.current.destroy(true)
          gameRef.current = null
        }
      }
    }, [])
  
  return (
    <>
      <h1>Game</h1>
      <div
            id="phaser-game"
            style={{
              width: `100%`,
              height: '100%',
              backgroundColor: 'red',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          ></div>    </>
  );
};

export default Game;