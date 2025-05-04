import * as React from 'react';
import { useState, useEffect } from 'react';
import Game from './components/game';
const App = () => {
  return (
    <div className="h-screen w-screen bg-linear-180 bg-[#1E1E1E] text-white">
      <Game />
    </div>
  );
}

export default App;
