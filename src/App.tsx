import { Route, Routes } from 'react-router-dom';

import Home from './Home.tsx';
import Tutorial from './Tutorial.tsx';
import InterLevel from './InterLevel.tsx';
import Game from './Game.tsx';
import React from 'react';


const App = () => {
  
  return (
    <>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/inter-level" element={<InterLevel />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
};

export default App;