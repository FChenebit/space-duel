import React from "react";
import { useNavigate } from "react-router-dom";
import { SPlayerShip } from "./gameplay/PlayerShip/entities/SPlayerShip";

const InterLevel = () => {
  const navigate = useNavigate();

  const playerShip = new SPlayerShip(0, 0, 'player', 0, 0);
  
  return (
    <>
      <h1>INTER LEVEL</h1>
      <button onClick={() => navigate('/game', { state: { playerShip } })}>Game</button>
      
      <div>
          Welcome on SpaceDuel Inter level
      </div>      
    </>
  );
};

export default InterLevel;