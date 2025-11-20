import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  
  
  return (
    <>
     <div>
      <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/tutorial">Tutorial</Link>
        </li>
        <li>
          <Link to="/inter-level">Inter Level</Link>
        </li>
      </ul>
    </nav>
    </div>
      <h1>HOME</h1>
      <div>
          Welcome on Space Duel
      </div>      
    </>
  );
};

export default Home;