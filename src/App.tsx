import { Route, Routes } from 'react-router-dom';

import Home from './Home.jsx';
import Tutorial from './Tutorial.jsx';
import InterLevel from './InterLevel.jsx';
import Game from './Game.jsx';


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