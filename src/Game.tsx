import React, { useEffect, useRef } from 'react';
import StartGame from './phaser/main-phaser'
import { useLocation } from "react-router-dom";
//import { SPlayerShip } from './gameplay/player-ship/entities/SPlayerShip';

const Game = () => {
  const gameRef = useRef<Phaser.Game | null>(null)
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const playerShip = location.state?.playerShip as SPlayerShip;
  const curLevel = location.state?.level
  const curPlayerShipEnhancement = location.state?.playerShipEnhancement
  //console.log('playerShip', JSON.stringify(playerShip));
    // Initialize Phaser game
  useEffect(() => {
    //console.log('level in game.tsx' + curLevel);
    gameRef.current = StartGame('phaser-game',curLevel,curPlayerShipEnhancement)
  
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