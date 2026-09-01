import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SPlayerShipEnhancement } from "./gameplay/player-ship/entities/SPlayerShipEnhancement";

const InterLevel = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState("");
  const [maxSpeed,setMaxSpeed] = useState(0);
  const [acceleration,setAcceleration] = useState(0);
  const [steering,setSteering] = useState(0);
  const [laserCooldown,setLaserCooldown] = useState(0);
  const [laserRange,setLaserRange] = useState(0);
  const [laserSpeed,setLaserSpeed] = useState(0);
  const [missileCooldown,setMissileCooldown] = useState(0);
  const [missileRange,setMissileRange] = useState(0);
  const [missileSpeed,setMissileSpeed] = useState(0);
  const [missileSteering,setMissileSteering] = useState(0);
  const [landmineCooldown,setLandmineCooldown] = useState(0);
  const [landmineRange,setLandmineRange] = useState(0);
  const [landmineSpeed,setLandmineSpeed] = useState(0);
  const [landmineDetectionRange,setLandmineDetectionRange] = useState(0);
  
  return (
    <>
      <h1>INTER LEVEL</h1>
      <button onClick={() => navigate('/game', {
        state: {
          level, playerShipEnhancement: new SPlayerShipEnhancement(
            maxSpeed, acceleration, steering, laserCooldown, laserRange, laserSpeed,
            missileCooldown, missileRange, missileSpeed, missileSteering,
            landmineCooldown, landmineRange, landmineSpeed, landmineDetectionRange
      ) } })}>Game</button>
      
      <div>
        Welcome on SpaceDuel Inter level <br />
        Level
            <input
                id="level"
                type="text"
                value={level}
                onChange={(event) => setLevel(event.target.value)}
            />
          MaxSpeed
            <input
                id="MaxSpeed"
                type="text"
                value={maxSpeed}
                onChange={(event) => setMaxSpeed(parseInt(event.target.value))}
        />
        acceleration
            <input
                id="acceleration"
                type="text"
                value={acceleration}
                onChange={(event) => setAcceleration(parseInt(event.target.value))}
        />
        steering
            <input
                id="steering"
                type="text"
                value={steering}
                onChange={(event) => setSteering(parseInt(event.target.value))}
        />
        laserCooldown
            <input
                id="laserCooldown"
                type="text"
                value={laserCooldown}
                onChange={(event) => setLaserCooldown(parseInt(event.target.value))}
        />
        laserRange
        <input
                id="laserRange"
                type="text"
                value={laserRange}
                onChange={(event) => setLaserRange(parseInt(event.target.value))}
        />
        laserSpeed
        <input
                id="laserSpeed"
                type="text"
                value={laserSpeed}
                onChange={(event) => setLaserSpeed(parseInt(event.target.value))}
        />
        missileCooldown
        <input
                id="missileCooldown"
                type="text"
                value={missileCooldown}
                onChange={(event) => setMissileCooldown(parseInt(event.target.value))}
        />
        missileRange
        <input
                id="missileRange"
                type="text"
                value={missileRange}
                onChange={(event) => setMissileRange(parseInt(event.target.value))}
        />
        missileSpeed
        <input
                id="missileSpeed"
                type="text"
                value={missileSpeed}
                onChange={(event) => setMissileSpeed(parseInt(event.target.value))}
        />
        missileSteering
        <input
                id="missileSteering"
                type="text"
                value={missileSteering}
                onChange={(event) => setMissileSteering(parseInt(event.target.value))}
        />
        landmineCooldown
        <input
                id="landmineCooldown"
                type="text"
                value={landmineCooldown}
                onChange={(event) => setLandmineCooldown(parseInt(event.target.value))}
        />
        landmineRange
        <input
                id="landmineRange"
                type="text"
                value={landmineRange}
                onChange={(event) => setLandmineRange(parseInt(event.target.value))}
        />
        landmineSpeed
        <input
                id="landmineSpeed"
                type="text"
                value={landmineSpeed}
                onChange={(event) => setLandmineSpeed(parseInt(event.target.value))}
        />
        landmineDetectionRange
        <input
                id="landmineDetectionRange"
                type="text"
                value={landmineDetectionRange}
                onChange={(event) => setLandmineDetectionRange(parseInt(event.target.value))}
            />
      </div>      
    </>
  );
};

export default InterLevel;