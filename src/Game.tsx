import React, { useEffect, useRef } from 'react';
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
      <div
            id="phaser-game"
            style={{
              display: 'grid',
              placeItems: 'center',
              height: '100vh',
              width: '100vw',
              backgroundColor: 'black'
            }}
          ></div>
  );
};

export default Game;